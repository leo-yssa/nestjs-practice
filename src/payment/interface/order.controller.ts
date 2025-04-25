import { Controller, Post, Param, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CheckoutCommand } from '@payment/application/command/checkout.command';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':userId/checkout')
  @ApiOperation({ summary: '장바구니 주문하기' })
  @ApiParam({ name: 'userId', description: '사용자 ID' })
  @ApiResponse({ status: 201, description: '주문이 생성됨' })
  checkout(@Param('userId') userId: string) {
    return this.commandBus.execute(new CheckoutCommand(userId));
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
