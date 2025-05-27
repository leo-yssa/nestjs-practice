import { Controller, Post, Param, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PreCheckoutCommand } from '@inventory/application/command/pre-checkout.command';
import { CheckoutInputVO } from '@inventory/domain/vo/checkout.vo';
import { PreCheckoutRequestDto, CheckoutRequestDto } from '@inventory/interface/dto/checkout.dto';
import { CheckoutCommand } from '@inventory/application/command/checkout.command';
import { plainToInstance } from 'class-transformer';
import { CallbackRequestDto, ConfirmRequestDto, WebhookRequestDto } from '@inventory/interface/dto/portone.dto';
import { CallbackCommand } from '@inventory/application/command/callback.command';
import { PortoneCallbackVO, PortoneConfirmVO, PortoneWebhookVO } from '@inventory/domain/vo/portone.vo';
import { ConfirmCommand } from '@inventory/application/command/confirm.command';
import { WebhookCommand } from '@inventory/application/command/webhook.command';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':userId/preCheckout')
  @ApiOperation({ summary: '주문 예약하기' })
  @ApiParam({ name: 'userId', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '주문 예약 완료' })
  preCheckout(@Param('userId') userId: string, @Body() dto: PreCheckoutRequestDto) {
    return this.commandBus.execute(
      plainToInstance(PreCheckoutCommand, {
        vo: {
          userId,
          productOptions: dto.productOptions,
        } as CheckoutInputVO,
      }),
    );
  }

  @Post(':userId/checkout')
  @ApiOperation({ summary: '주문 완료하기' })
  @ApiParam({ name: 'userId', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '주문 완료' })
  checkout(@Param('userId') userId: string, @Body() dto: CheckoutRequestDto) {
    return this.commandBus.execute(
      plainToInstance(CheckoutCommand, {
        vo: {
          userId,
          productOptions: dto.productOptions,
        } as CheckoutInputVO,
      }),
    );
  }

  @Post('/callback')
  @ApiOperation({ summary: 'Portone 결제 callback' })
  @ApiBody({ type: CallbackRequestDto })
  async callback(@Body() dto: CallbackRequestDto) {
    return await this.commandBus.execute(
      plainToInstance(CallbackCommand, {
        vo: {
          impUid: dto.impUid,
          merchantUid: dto.merchantUid,
        } as PortoneCallbackVO,
      }),
    );
  }

  @Post('/confirm')
  @ApiOperation({ summary: 'Portone 결제 확정' })
  @ApiBody({ type: ConfirmRequestDto })
  async confirm(@Body() dto: ConfirmRequestDto) {
    return await this.commandBus.execute(
      plainToInstance(ConfirmCommand, {
        vo: {
          impUid: dto.impUid,
          merchantUid: dto.merchantUid,
        } as PortoneConfirmVO,
      }),
    );
  }

  @ApiOperation({ summary: 'Portone 결제 webhook' })
  @ApiBody({ type: WebhookRequestDto })
  @Post('/webhook')
  async webhook(@Body() dto: WebhookRequestDto) {
    return await this.commandBus.execute(
      plainToInstance(WebhookCommand, {
        vo: {
          impUid: dto.impUid,
          merchantUid: dto.merchantUid,
          status: dto.status,
          cancellationId: dto.cancellationId,
        } as PortoneWebhookVO,
      }),
    );
  }

  //   @Get(':userId')
  //   @ApiOperation({ summary: '사용자의 주문 목록 조회' })
  //   @ApiParam({ name: 'userId', description: '사용자 ID' })
  //   getUserOrders(@Param('userId') userId: number) {
  //     return this.orderService.getOrdersByUserId(userId);
  //   }

  //   @Get('detail/:orderId')
  //   @ApiOperation({ summary: '특정 주문 상세 조회' })
  //   @ApiParam({ name: 'orderId', description: '주문 ID' })
  //   getOrderDetail(@Param('orderId') orderId: number) {
  //     return this.orderService.getOrderDetail(orderId);
  //   }
}
