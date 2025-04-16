import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Collection')
@Controller('collections')
export class CollectionController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
}
