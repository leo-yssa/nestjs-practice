export class PortoneVO {
  constructor(
    public readonly impUid: string,
    public readonly merchantUid: string,
    public readonly status: string,
    public readonly cancellationId: string,
  ) {}
}

export type PortoneCallbackVO = Pick<PortoneVO, 'impUid' | 'merchantUid'>;
export type PortoneConfirmVO = Pick<PortoneVO, 'impUid' | 'merchantUid'>;
export type PortoneWebhookVO = Pick<PortoneVO, 'impUid' | 'merchantUid' | 'status' | 'cancellationId'>;
