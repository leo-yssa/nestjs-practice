export class PortoneSettlementVO {
  constructor(
    public readonly partnerId: string,
    public readonly paymentId: string,
    public readonly orderAmount: number,
  ) {}
}

export type PortoneSettlementOrderInputVO = Pick<PortoneSettlementVO, 'partnerId' | 'paymentId' | 'orderAmount'>;
