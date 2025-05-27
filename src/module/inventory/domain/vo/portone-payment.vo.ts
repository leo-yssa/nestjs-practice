export class PortonePaymentVO {
  constructor(
    public readonly accessToken: string,
    public readonly now: number,
    public readonly expiredAt: number,
    public readonly impUid: string,
    public readonly merchantUid: string,
    public readonly partnerId: string,
    public readonly paymentId: string,
    public readonly orderAmount: number,
    public readonly amount: number,
    public readonly status: string,
    public readonly paidAt: number,
    public readonly startedAt: number,
    public readonly cancelledAt: number,
    public readonly cancelReason: string,
  ) {}
}

export type PortonePaymentReceiptInputVO = Pick<PortonePaymentVO, 'accessToken' | 'impUid' | 'merchantUid'>;

export type PortonePaymentReceiptResultVO = Pick<
  PortonePaymentVO,
  'amount' | 'impUid' | 'merchantUid' | 'status' | 'paidAt' | 'startedAt' | 'cancelledAt' | 'cancelReason'
>;

export type PortoneAccessTokenResultVO = Pick<PortonePaymentVO, 'accessToken' | 'now' | 'expiredAt'>;

export type PortonePaymentCancelInputVO = Pick<PortonePaymentVO, 'accessToken' | 'impUid' | 'merchantUid'>;
