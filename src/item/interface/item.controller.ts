import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('Item')
@Controller('items')
export class ItemController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
}
