import { Inject, Injectable } from '@nestjs/common';
import { CheckoutInputVO, PreCheckoutInputVO } from '@inventory/domain/vo/checkout.vo';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DataSource, EntityManager } from 'typeorm';
import { IInventoryRepository } from '@inventory/domain/repository/inventory-repository.interface';
import { plainToInstance } from 'class-transformer';
import {
  GetProductOrderByIdInputVO,
  ProductOrderVO,
  UpdateProductOrderStatusWithPaymentIdInputVO,
} from '@inventory/domain/vo/product-order.vo';
import { ProductOrderItemVO } from '@inventory/domain/vo/product-order-item.vo';
import { ProductStockVO } from '@inventory/domain/vo/product-stock.vo';
import { ProductItemVO } from '@inventory/domain/vo/product-item.vo';
import { UserPort } from '@inventory/domain/port/user.port';
import { ProductPort } from '@inventory/domain/port/product.port';
import { IOrderService } from '@inventory/domain/service/order-service.interface';
import { PortoneCallbackVO, PortoneConfirmVO, PortoneWebhookVO } from '@inventory/domain/vo/portone.vo';
import { PortoneSettlementPort } from '@inventory/domain/port/portone-settlement.port';
import { PortonePaymentPort } from '@inventory/domain/port/portone-payment.port';
import { PortonePaymentReceiptResultVO, PortonePaymentVO } from '@inventory/domain/vo/portone-payment.vo';
import { ITEM_STATUS, PAYMENT_STATUS, PaymentStatusType } from '@shared/type/inventory.type';
import { IInventoryCache } from '@inventory/domain/cache/inventory-cache.interface';
@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
    private dataSource: DataSource,
    @Inject('UserPort') private readonly userAdapter: UserPort,
    @Inject('ProductPort') private readonly productAdapter: ProductPort,
    @Inject('InventoryCache') private readonly inventoryCache: IInventoryCache,
    @Inject('InventoryRepository')
    private readonly inventoryRepository: IInventoryRepository,
    @Inject('PortoneSettlementPort')
    private readonly portoneSettlementAdapter: PortoneSettlementPort,
    @Inject('PortonePaymentPort')
    private readonly portonePaymentAdapter: PortonePaymentPort,
  ) {}

  async preCheckout(checkout: PreCheckoutInputVO): Promise<void> {
    this.logger.log(`preCheckout: ${JSON.stringify(checkout)}`);
    const { userId, productOptions } = checkout;
    await this.dataSource.transaction(async (manager) => {
      const user = await this.userAdapter.getUserById(userId, manager);
      if (!user) {
        this.logger.error('존재하지 않는 유저입니다.');
      }
      const optionIds = productOptions.map((option) => option.id);
      const productStocks = await this.inventoryRepository.getProductStocksByOptionIds(optionIds, manager);
      if (productStocks.length !== productOptions.length) {
        this.logger.error('일부 상품의 재고 정보를 찾을 수 없습니다.');
      }
      const insufficientStock = productStocks.find((stock) => {
        const requestedQuantity = productOptions.find((option) => option.id === stock.productOptionId)?.quantity || 0;
        return stock.available < requestedQuantity;
      });
      if (insufficientStock) {
        this.logger.error(`재고가 부족합니다. (optionId: ${insufficientStock.productOptionId})`);
      }
      const productItems = await this.inventoryRepository.getProductItems(productOptions, manager);
      if (productItems.length !== productOptions.length) {
        this.logger.error('상품이 존재하지 않습니다.');
      }
      const availableItemsByOption = productItems.reduce((acc, item) => {
        if (!acc[item.productOptionId]) {
          acc[item.productOptionId] = [];
        }
        acc[item.productOptionId].push(item);
        return acc;
      }, {});
      for (const optionId of productOptions.map((option) => option.id)) {
        if (!availableItemsByOption[optionId] || availableItemsByOption[optionId].length === 0) {
          this.logger.error(`구매 가능한 상품이 없습니다. (optionId: ${optionId})`);
        }
      }
      const order = this.inventoryRepository.createProductOrder(
        plainToInstance(ProductOrderVO, {
          userId,
          productOptions,
        }),
        manager,
      );
      const stockUpdates: ProductStockVO[] = [];
      const itemUpdates: ProductItemVO[] = [];
      for (const optionId of productOptions.map((option) => option.id)) {
        const stock = productStocks.find((s) => s.productOptionId === optionId);
        const item = availableItemsByOption[optionId][0];
        const orderItem = this.inventoryRepository.createProductOrderItem(
          plainToInstance(ProductOrderItemVO, {
            productOrderId: order.id,
            productItemId: item.id,
          }),
          manager,
        );
        order.items.push(orderItem);

        stock.available -= 1;
        stock.hold += 1;
        stockUpdates.push(stock);

        item.status = ITEM_STATUS.HOLD;
        itemUpdates.push(item);
      }
      await Promise.all([
        this.inventoryRepository.updateProductStocks(stockUpdates, manager),
        this.inventoryRepository.updateProductItems(itemUpdates, manager),
        this.inventoryRepository.saveProductOrder(order, manager),
      ]);
    });
    // 반환해야 할 것들
    // 주문 번호
    // 선택한 옵션들의 정보, 가격, 할인, 할인 금액, 할인된 금액 등
    // 선택한 상품의 결제 방식
  }

  async checkout(checkout: CheckoutInputVO): Promise<void> {
    this.logger.log(`checkout: ${JSON.stringify(checkout)}`);
    const {
      orderId,
      userId,
      payMethod,
      priceAtPurchase,
      isOrderConfirmed,
      isAdultConfirmed,
      isRefundPolicyConfirmed,
      isPrivacyPolicyConfirmed,
    } = checkout;

    // Validate all confirmations are true
    if (!isOrderConfirmed || !isAdultConfirmed || !isRefundPolicyConfirmed || !isPrivacyPolicyConfirmed) {
      this.logger.error('필수 동의 항목이 누락되었습니다.');
    }

    await this.dataSource.transaction(async (manager) => {
      // Get user information
      const user = await this.userAdapter.getUserById(userId, manager);
      if (!user) {
        this.logger.error('존재하지 않는 유저입니다.');
        throw new Error('존재하지 않는 유저입니다.');
      }

      // Get the existing order from preCheckout
      const order = await this.inventoryRepository.getProductOrderById(
        {
          id: orderId,
        } as GetProductOrderByIdInputVO,
        manager,
      );
      if (!order) {
        this.logger.error('주문 정보를 찾을 수 없습니다.');
        throw new Error('주문 정보를 찾을 수 없습니다.');
      }

      // Update order with additional information
      order.payMethod = payMethod;
      order.priceAtPurchase = priceAtPurchase;
      order.paymentStatus = PAYMENT_STATUS.PENDING;
      order.isOrderConfirmed = isOrderConfirmed;
      order.isAdultConfirmed = isAdultConfirmed;
      order.isRefundPolicyConfirmed = isRefundPolicyConfirmed;
      order.isPrivacyPolicyConfirmed = isPrivacyPolicyConfirmed;

      // Save the updated order
      await this.inventoryRepository.saveProductOrder(order, manager);
    });
  }

  async callback(callback: PortoneCallbackVO): Promise<void> {
    this.logger.log(`callback: ${JSON.stringify(callback)}`);

    const paymentReceipt = await this.getPortonePaymentReceipt(callback.impUid, callback.merchantUid);

    const productOrder = await this.getProductOrderById(callback.merchantUid);
    if (!productOrder) {
      this.logger.error('주문 정보를 찾을 수 없습니다.');
    }

    await this.updateProductOrderStatusWithPaymentId({
      id: productOrder.id,
      paymentStatus: paymentReceipt.status,
      paymentId: paymentReceipt.impUid,
    } as UpdateProductOrderStatusWithPaymentIdInputVO);

    // 4. 응답 반환
    // return {
    //   orderNumber: productOrder.id,
    //   paymentStatus: paymentReceipt.status,
    //   resultMessage: '결제 상태가 업데이트되었습니다.',
    // };
  }

  async confirm(confirm: PortoneConfirmVO): Promise<void> {
    // 결제 전 최종 확인
    // 재고 확인 및 체크아웃 정보와 일치하는지 확인
    const productOrder = await this.getProductOrderById(confirm.merchantUid);
    if (!productOrder) {
      this.logger.error('주문 정보를 찾을 수 없습니다.');
    }

    // 재고 확인
    const optionIds = productOrder.items.map((item) => item.item.productOptionId);
    const productStocks = await this.inventoryRepository.getProductStocksByOptionIds(optionIds);
    if (productStocks.length !== optionIds.length) {
      this.logger.error('일부 상품의 재고 정보를 찾을 수 없습니다.');
    }
    // return {
    //   orderNumber: checkout.orderNumber,
    //   paymentStatus: PaymentStatus.SUCCESS_PAYMENT_APPROVE,
    //   resultMessage: '결제가 성공적으로 완료되었습니다.',
    //   originalsOptions: checkout.originalsOptions,
    // };
  }

  async webhook(webhook: PortoneWebhookVO): Promise<void> {
    this.logger.log(`webhook: ${JSON.stringify(webhook)}`);
    await this.dataSource.transaction(async (manager) => {
      const productOrder = await this.getProductOrderById(webhook.merchantUid, manager);
      if (!productOrder) {
        this.logger.error('주문 정보를 찾을 수 없습니다.');
      }
      const optionIds = [...new Set(productOrder.items.map((item) => item.item.productOptionId))];
      const productStocks = await this.inventoryRepository.getProductStocksByOptionIds(optionIds, manager);
      if (productStocks.length !== optionIds.length) {
        this.logger.error('일부 상품의 재고 정보를 찾을 수 없습니다.');
      }
      productOrder.paymentStatus = webhook.status as PaymentStatusType;
      productOrder.paidAt = new Date();
      await this.inventoryRepository.saveProductOrder(productOrder, manager);
      if (webhook.status === PAYMENT_STATUS.PAID) {
        const stockUpdates = [];
        const itemUpdates = [];

        // 옵션별로 재고 정보 매핑
        const stockMap = productStocks.reduce((acc, stock) => {
          acc[stock.productOptionId] = stock;
          return acc;
        }, {});
        for (const orderItem of productOrder.items) {
          const item = orderItem.item;
          const stock = stockMap[item.productOptionId];

          // 재고 상태 업데이트 (hold -> sold)
          stock.hold -= 1;
          stock.sold += 1;
          stockUpdates.push(stock);

          // 아이템 상태 업데이트 (hold -> sold)
          item.status = ITEM_STATUS.SOLD;
          itemUpdates.push(item);
        }
        await Promise.all([
          this.inventoryRepository.updateProductStocks(stockUpdates, manager),
          this.inventoryRepository.updateProductItems(itemUpdates, manager),
        ]);
      }
    });

    // 5. 응답 반환
    // return {
    //   orderNumber: checkout.orderNumber,
    //   paymentStatus: mappedStatus,
    //   resultMessage: '결제 상태가 업데이트되었습니다.',
    // };
  }

  async updateProductOrderStatusWithPaymentId(input: UpdateProductOrderStatusWithPaymentIdInputVO): Promise<void> {
    await this.inventoryRepository.updateProductOrderStatusWithPaymentId(input);
  }

  async getProductOrderById(id: string, manager?: EntityManager): Promise<ProductOrderVO> {
    return await this.inventoryRepository.getProductOrderById(
      {
        id,
      } as GetProductOrderByIdInputVO,
      manager,
    );
  }

  async getPortonePaymentReceipt(impUid: string, merchantUid: string): Promise<PortonePaymentReceiptResultVO> {
    let portoneAccessToken = await this.inventoryCache.getPortoneAccessToken();
    if (!portoneAccessToken) {
      portoneAccessToken = (await this.portonePaymentAdapter.getPortoneAccessToken()).accessToken;
      await this.inventoryCache.savePortoneAccessToken(portoneAccessToken, 3600);
    }
    const paymentReceipt = await this.portonePaymentAdapter.getPortonePaymentReceipt(
      plainToInstance(PortonePaymentVO, {
        accessToken: portoneAccessToken,
        impUid: impUid,
        merchantUid: merchantUid,
      }),
    );
    return paymentReceipt;
  }
}
