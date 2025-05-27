import { Injectable } from '@nestjs/common';
import { PortoneSettlementPort } from '@inventory/domain/port/portone-settlement.port';
import { PortoneSettlementService } from '@portone/portone-settlement.service';
import { PortoneSettlementOrderInputVO } from '@inventory/domain/vo/portone-settlement.vo';
@Injectable()
export class PortoneSettlementAdapter implements PortoneSettlementPort {
  constructor(private readonly portoneSettlementService: PortoneSettlementService) {}

  async portoneSettlementOrder(portoneSettlementOrderInputVo: PortoneSettlementOrderInputVO): Promise<void> {
    await this.portoneSettlementService.order({
      partnerId: portoneSettlementOrderInputVo.partnerId,
      paymentId: portoneSettlementOrderInputVo.paymentId,
      orderDetail: {
        orderAmount: portoneSettlementOrderInputVo.orderAmount,
      },
      discounts: [],
      additionalFees: [],
    });
  }
}
