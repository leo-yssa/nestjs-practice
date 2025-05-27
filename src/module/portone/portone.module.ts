import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PortoneOptionV1 } from './portone.option.v1';
import { PortoneOptionV2 } from './portone.option.v2';
import { PortonePaymentService } from './portone-payment.service';
import { PortoneSettlementService } from './portone-settlement.service';

@Module({
  imports: [HttpModule],
  providers: [
    PortoneOptionV1,
    PortoneOptionV2,
    {
      provide: 'PortonePaymentService',
      useClass: PortonePaymentService,
    },
    {
      provide: 'PortoneSettlementService',
      useClass: PortoneSettlementService,
    },
  ],
  exports: ['PortonePaymentService', 'PortoneSettlementService'],
})
export class PortoneModule {}
