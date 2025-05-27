import { CheckoutInputVO, PreCheckoutInputVO } from '@inventory/domain/vo/checkout.vo';
import { PortoneCallbackVO, PortoneConfirmVO, PortoneWebhookVO } from '@inventory/domain/vo/portone.vo';

export interface IOrderService {
  preCheckout(checkout: PreCheckoutInputVO): Promise<void>;
  checkout(checkout: CheckoutInputVO): Promise<void>;
  callback(callback: PortoneCallbackVO): Promise<void>;
  confirm(confirm: PortoneConfirmVO): Promise<void>;
  webhook(webhook: PortoneWebhookVO): Promise<void>;
}
