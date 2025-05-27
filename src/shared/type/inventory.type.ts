export const ITEM_STATUS = {
  AVAILABLE: 'available',
  HOLD: 'hold',
  SOLD: 'sold',
} as const;

export type ItemStatusType = (typeof ITEM_STATUS)[keyof typeof ITEM_STATUS];
export const ITEM_STATUS_ARRAY = Object.values(ITEM_STATUS);

export const PAYMENT_STATUS = {
  READY: 'ready',
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export const PAYMENT_STATUS_ARRAY = Object.values(PAYMENT_STATUS);

export const SETTLEMENT_STATUS = {
  READY: 'ready',
  SETTLED: 'settled',
  FAILED: 'failed',
} as const;

export type SettlementStatusType = (typeof SETTLEMENT_STATUS)[keyof typeof SETTLEMENT_STATUS];
export const SETTLEMENT_STATUS_ARRAY = Object.values(SETTLEMENT_STATUS);
