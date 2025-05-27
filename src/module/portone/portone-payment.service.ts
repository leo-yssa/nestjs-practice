import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PortoneOptionV1 } from './portone.option.v1';
import { PortoneApiException, PortoneNotFoundException } from './portone.exception';

@Injectable()
export class PortonePaymentService {
  private readonly logger = new Logger(PortonePaymentService.name);

  constructor(
    private readonly option: PortoneOptionV1,
    private readonly httpService: HttpService,
  ) {}

  async getPortoneAccessToken(): Promise<{
    code: number;
    message?: string;
    response: {
      access_token: string;
      now: number;
      expired_at: number;
    };
  }> {
    try {
      const accessToken = await lastValueFrom(
        this.httpService.post(`${this.option.host}/users/getToken`, {
          imp_key: this.option.accessKey,
          imp_secret: this.option.secretKey,
        }),
      );

      return accessToken.data;
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }

  async getPortonePaymentReceipt({
    access_token,
    imp_uid,
    merchant_uid,
  }: {
    access_token: string;
    imp_uid: string;
    merchant_uid: string;
  }): Promise<{
    code: number;
    message?: string;
    response: {
      amount: number;
      apply_num?: string;
      bank_code?: string;
      bank_name?: string;
      buyer_addr?: string;
      buyer_email?: string;
      buyer_name: string;
      buyer_postcode?: string;
      buyer_tel?: string;
      cancel_amount: number;
      cancel_history?: {
        pg_tid: string;
        amount: number;
        cancelled_at: number;
        reason: string;
        cancellation_id: string;
        receipt_url: string | null;
      }[];
      cancel_reason?: string;
      cancel_receipt_urls?: string[];
      cancelled_at?: number;
      card_code?: string;
      card_name?: string;
      card_number?: string;
      card_quota?: number;
      card_type?: number;
      cash_receipt_issued?: boolean;
      channel?: string;
      currency: string;
      custom_data?: string;
      customer_uid?: string;
      customer_uid_usage?: string;
      emb_pg_provider?: string;
      escrow?: boolean;
      fail_reason?: string;
      failed_at?: number;
      imp_uid: string;
      merchant_uid: string;
      name?: string;
      paid_at?: number;
      pay_method?: string;
      pg_id?: string;
      pg_provider?: string;
      pg_tid?: string;
      receipt_url?: string;
      started_at?: number;
      status: string;
      user_agent?: string;
      vbank_code?: string;
      vbank_date?: number;
      vbank_holder?: string;
      vbank_issued_at?: number;
      vbank_name?: string;
      vbank_num?: string;
    };
  }> {
    try {
      const paymentReciept = await lastValueFrom(
        this.httpService.get(`${this.option.host}/payments/${imp_uid}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        }),
      );
      const { merchant_uid: portone_ord_no } = paymentReciept.data;
      if (merchant_uid !== portone_ord_no) {
        throw new PortoneNotFoundException();
      }
      return paymentReciept.data;
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }

  async cancelPayment({
    access_token,
    imp_uid,
    merchant_uid,
    amount,
    tax_free,
    vat_amount,
    checksum,
    reason,
    refund_holder,
    refund_bank,
    refund_account,
    refund_tel,
    extra,
  }: {
    access_token: string;
    imp_uid: string;
    merchant_uid: string;
    amount?: number;
    tax_free?: number;
    vat_amount?: number;
    checksum?: number;
    // 취소 사유
    reason?: string;
    // 환불계좌 예금주
    refund_holder?: string;
    // 환급계좌 은행코드
    refund_bank?: string;
    // 환급계좌 계좌번호
    refund_account?: string;
    // 환급계좌 예금주 연락처
    refund_tel?: string;
    // 추가 파라미터
    extra?: Array<any>;
  }): Promise<{
    code: number;
    message?: string;
    response: {
      imp_uid: string;
      merchant_uid: string;
      currency: string;
      amount: number;
      status: string;
      apply_num?: string;
      bank_code?: string;
      bank_name?: string;
      buyer_addr?: string;
      buyer_email?: string;
      buyer_name?: string;
      buyer_postcode?: string;
      buyer_tel?: string;
      cancel_amount?: number;
      cancel_history?: {
        pg_tid: string;
        amount: number;
        cancelled_at: number;
        reason: string;
        cancellation_id: string;
        receipt_url: string | null;
      }[];
      cancel_reason?: string;
      cancel_receipt_urls?: [];
      cancelled_at?: number;
      card_code?: null;
      card_name?: null;
      card_number?: null;
      card_quota?: number;
      card_type?: null;
      cash_receipt_issued?: boolean;
      channel?: string;
      custom_data?: string;
      customer_uid?: string;
      customer_uid_usage?: string;
      emb_pg_provider?: string;
      escrow?: boolean;
      fail_reason?: string;
      failed_at: number;
      name?: string;
      paid_at?: number;
      pay_method?: string;
      pg_id?: string;
      pg_provider?: string;
      pg_tid?: string;
      receipt_url?: string;
      started_at?: number;
      user_agent?: string;
      vbank_code?: string;
      vbank_date?: number;
      vbank_holder?: string;
      vbank_issued_at?: number;
      vbank_name?: string;
      vbank_num?: number;
    };
  }> {
    try {
      const cancelPayment = await lastValueFrom(
        this.httpService.post(
          `${this.option.host}/payments/cancel`,
          {
            imp_uid: imp_uid,
            merchant_uid: merchant_uid,
            amount,
            tax_free,
            vat_amount,
            checksum,
            reason,
            refund_holder,
            refund_bank,
            refund_account,
            refund_tel,
            extra,
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          },
        ),
      );
      return cancelPayment.data;
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }
}
