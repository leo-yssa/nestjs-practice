import { Injectable } from '@nestjs/common';
import { NormalItemProcessor } from '@payment/domain/service/item/normal-item.processor';
import { SeatItemProcessor } from '@payment/domain/service/item/seat-item.processor';
import { FreeItemProcessor } from '@payment/domain/service/item/free-item.processor';
import { IItemProcessor } from '@payment/domain/service/item/item-processor.interface';
import { ItemType } from '@shared/type/item.type';

@Injectable()
export class ItemProcessorFactory {
  constructor(
    private readonly normalProcessor: NormalItemProcessor,
    private readonly seatProcessor: SeatItemProcessor,
    private readonly freeProcessor: FreeItemProcessor,
  ) {}

  getProcessor(itemType: ItemType): IItemProcessor {
    switch (itemType) {
      case ItemType.NORMAL:
        return this.normalProcessor;
      case ItemType.SEAT:
        return this.seatProcessor;
      case ItemType.FREE:
        return this.freeProcessor;
      default:
        throw new Error('Unknown item type');
    }
  }
}
