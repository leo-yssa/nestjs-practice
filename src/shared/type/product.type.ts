export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  REQUIRED: 'required',
  DEPLOYING: 'deploying',
  DEPLOYED: 'deployed',
  CREATING_ITEM: 'creating_item',
  MINTING: 'minting',
  MINTED: 'minted',
} as const;

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];
export const PRODUCT_STATUS_ARRAY = Object.values(PRODUCT_STATUS);

export const PRODUCT_CATEGORY = {
  TICKET: 'TICKET',
  MEMBERSHIP: 'MEMBERSHIP',
} as const;

export type ProductCategory = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];
export const PRODUCT_CATEGORY_ARRAY = Object.values(PRODUCT_CATEGORY);

export const PRODUCT_SALE_TYPE = {
  VOUCHER: 'voucher',
  DATE_SELECT: 'date_select',
  RESERVED_SEAT: 'reserved_seat',
} as const;

export type ProductSaleType = (typeof PRODUCT_SALE_TYPE)[keyof typeof PRODUCT_SALE_TYPE];
export const PRODUCT_SALE_TYPE_ARRAY = Object.values(PRODUCT_SALE_TYPE);

export const PRODUCT_SALE_STATUS = {
  PENDING: 'pending',
  ON_SALE: 'on_sale',
  SOLD_OUT: 'sold_out',
  ENDED: 'ended',
} as const;

export type ProductSaleStatus = (typeof PRODUCT_SALE_STATUS)[keyof typeof PRODUCT_SALE_STATUS];
export const PRODUCT_SALE_STATUS_ARRAY = Object.values(PRODUCT_SALE_STATUS);

export const CUSTOMER_INQUIRY_TYPE = {
  URL: 'url',
  PHONE: 'phone',
} as const;

export type CustomerInquiryType = (typeof CUSTOMER_INQUIRY_TYPE)[keyof typeof CUSTOMER_INQUIRY_TYPE];
export const CUSTOMER_INQUIRY_TYPE_ARRAY = Object.values(CUSTOMER_INQUIRY_TYPE);
