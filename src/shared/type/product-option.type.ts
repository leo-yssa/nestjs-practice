export const PRODUCT_OPTION_SLOT_VALUE_TYPE = {
  DATE: 'date',
  TEXT: 'text',
} as const;

export type ProductOptionSlotValueType =
  (typeof PRODUCT_OPTION_SLOT_VALUE_TYPE)[keyof typeof PRODUCT_OPTION_SLOT_VALUE_TYPE];
export const PRODUCT_OPTION_SLOT_VALUE_TYPE_ARRAY = Object.values(PRODUCT_OPTION_SLOT_VALUE_TYPE);
