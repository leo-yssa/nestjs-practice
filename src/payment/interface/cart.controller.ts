import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AddItemCommand } from '../application/command/add-item.command';
import { AddCartItemRequestDto } from './dto/req/add-item.dto';

@ApiTags('Cart')
@Controller('carts')
export class CartController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
  @Post(':userId/add')
  @ApiOperation({ summary: '장바구니에 상품 추가' })
  @ApiParam({ name: 'userId', description: '사용자 ID' })
  @ApiBody({ type: AddCartItemRequestDto })
  @ApiResponse({ status: 201, description: '상품이 장바구니에 추가됨' })
  addItem(@Param('userId') userId: string, @Body() dto: AddCartItemRequestDto) {
    return this.commandBus.execute(
      new AddItemCommand(userId, dto.itemId, dto.quantity),
    );
  }

  // @Get(':userId')
  // @ApiOperation({ summary: '장바구니 조회' })
  // @ApiParam({ name: 'userId', description: '사용자 ID' })
  // getCart(@Param('userId') userId: string) {
  //   return this.queryBus.execute(new GetCartQuery(userId));
  // }

  // @Delete(':userId/item/:itemId')
  // @ApiOperation({ summary: '장바구니에서 상품 제거' })
  // @ApiParam({ name: 'userId', description: '사용자 ID' })
  // @ApiParam({ name: 'itemId', description: '제거할 상품 ID' })
  // removeItem(@Param('userId') userId: string, @Param('itemId') itemId: string) {
  //   return this.commandBus.execute(new RemoveItemCommand(userId, itemId));
  // }
}
