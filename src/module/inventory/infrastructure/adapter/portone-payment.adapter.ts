import { Injectable } from '@nestjs/common';
import { PortonePaymentPort } from '@inventory/domain/port/portone-payment.port';
import {
  PortoneAccessTokenResultVO,
  PortonePaymentReceiptInputVO,
  PortonePaymentReceiptResultVO,
  PortonePaymentCancelInputVO,
} from '@inventory/domain/vo/portone-payment.vo';
import { PortonePaymentService } from '@portone/portone-payment.service';

@Injectable()
export class PortonePaymentAdapter implements PortonePaymentPort {
  constructor(private readonly portonePaymentService: PortonePaymentService) {}

  async getPortoneAccessToken(): Promise<PortoneAccessTokenResultVO> {
    const accessToken = await this.portonePaymentService.getPortoneAccessToken();
    return {
      accessToken: accessToken.response.access_token,
      expiredAt: accessToken.response.expired_at,
      now: accessToken.response.now,
    } as PortoneAccessTokenResultVO;
  }

  async getPortonePaymentReceipt(
    portonePaymentVo: PortonePaymentReceiptInputVO,
  ): Promise<PortonePaymentReceiptResultVO> {
    const paymentReceipt = await this.portonePaymentService.getPortonePaymentReceipt({
      access_token: portonePaymentVo.accessToken,
      imp_uid: portonePaymentVo.impUid,
      merchant_uid: portonePaymentVo.merchantUid,
    });
    return {
      amount: paymentReceipt.response.amount,
      impUid: paymentReceipt.response.imp_uid,
      merchantUid: paymentReceipt.response.merchant_uid,
      status: paymentReceipt.response.status,
      paidAt: paymentReceipt.response.paid_at,
      startedAt: paymentReceipt.response.started_at,
      cancelledAt: paymentReceipt.response.cancelled_at,
      cancelReason: paymentReceipt.response.cancel_reason,
    } as PortonePaymentReceiptResultVO;
  }

  async cancelPayment(portonePaymentVo: PortonePaymentCancelInputVO): Promise<PortonePaymentReceiptResultVO> {
    const paymentReceipt = await this.portonePaymentService.cancelPayment({
      access_token: portonePaymentVo.accessToken,
      imp_uid: portonePaymentVo.impUid,
      merchant_uid: portonePaymentVo.merchantUid,
    });
    return {
      amount: paymentReceipt.response.amount,
      impUid: paymentReceipt.response.imp_uid,
      merchantUid: paymentReceipt.response.merchant_uid,
      status: paymentReceipt.response.status,
      paidAt: paymentReceipt.response.paid_at,
      startedAt: paymentReceipt.response.started_at,
      cancelledAt: paymentReceipt.response.cancelled_at,
      cancelReason: paymentReceipt.response.cancel_reason,
    } as PortonePaymentReceiptResultVO;
  }
}
