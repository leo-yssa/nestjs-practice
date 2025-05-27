import { PortoneAccessTokenResultVO, PortonePaymentVO, PortonePaymentReceiptResultVO } from '../vo/portone-payment.vo';
export interface PortonePaymentPort {
  getPortoneAccessToken(): Promise<PortoneAccessTokenResultVO>;
  getPortonePaymentReceipt(portonePaymentVo: PortonePaymentVO): Promise<PortonePaymentReceiptResultVO>;
  cancelPayment(portonePaymentVo: PortonePaymentVO): Promise<PortonePaymentReceiptResultVO>;
}
