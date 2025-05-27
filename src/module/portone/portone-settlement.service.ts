import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PortoneOptionV2 } from './portone.option.v2';
import { PortoneApiException } from './portone.exception';

@Injectable()
export class PortoneSettlementService {
  private readonly logger = new Logger(PortoneSettlementService.name);

  constructor(
    private readonly option: PortoneOptionV2,
    private readonly httpService: HttpService,
  ) {}

  // 계약 조회
  async contract({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/contracts/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }
  async updateContract({
    id,
    name,
    memo,
    platformFee,
    settlementCycle,
    platformFeeVatPayer,
    subtractPaymentVatAmount,
  }: {
    id?: string;
    name: string;
    memo?: string;
    platformFee: {
      fixedRate?: number;
      fixedAmount?: number;
    };
    settlementCycle: {
      lagDays: number;
      datePolicy: string;
      method: {
        daily?: Record<string, any>;
        weekly?: {
          daysOfWeek: string[];
        };
        monthly?: {
          daysOfMonth: number[];
        };
        manualDates?: {
          dates: {
            month: number;
            day: number;
          }[];
        };
      };
    };
    platformFeeVatPayer: string;
    subtractPaymentVatAmount: boolean; // 정산 시 결제 금액 부가세 감면 여부
  }) {
    try {
      return await lastValueFrom(
        this.httpService.patch(
          `${this.option.apiHost}/platform/contracts/${id}`,
          {
            name: name,
            memo: memo,
            platformFee: platformFee,
            settlementCycle: settlementCycle,
            platformFeeVatPayer: platformFeeVatPayer,
            subtractPaymentVatAmount: subtractPaymentVatAmount,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async createContract({
    id,
    name,
    memo,
    platformFee,
    settlementCycle,
    platformFeeVatPayer,
    subtractPaymentVatAmount,
  }: {
    id?: string;
    name: string;
    memo?: string;
    platformFee: {
      fixedRate?: number;
      fixedAmount?: number;
    };
    settlementCycle: {
      lagDays: number;
      datePolicy: string;
      method: {
        daily?: Record<string, any>;
        weekly?: {
          daysOfWeek: string[];
        };
        monthly?: {
          daysOfMonth: number[];
        };
        manualDates?: {
          dates: {
            month: number;
            day: number;
          }[];
        };
      };
    };
    platformFeeVatPayer: string;
    subtractPaymentVatAmount: boolean; // 정산 시 결제 금액 부가세 감면 여부
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/contracts`,
          {
            id: id,
            name: name,
            memo: memo,
            platformFee: platformFee,
            settlementCycle: settlementCycle,
            platformFeeVatPayer: platformFeeVatPayer,
            subtractPaymentVatAmount: subtractPaymentVatAmount,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async recoverContract({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/contracts/${id}/recover`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async archiveContract({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/contracts/${id}/archive`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async archiveDiscountSharePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/discount-share-policies/${id}/archive`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async recoverDiscountSharePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/discount-share-policies/${id}/recover`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async updateDiscountSharePolicy({
    id,
    name,
    partnerShareRate,
    memo,
  }: {
    id?: string;
    name: string;
    partnerShareRate: number;
    memo?: string;
  }) {
    try {
      return await lastValueFrom(
        this.httpService.patch(
          `${this.option.apiHost}/platform/discount-share-policies/${id}`,
          {
            name: name,
            partnerShareRate: partnerShareRate,
            memo: memo,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async createDiscountSharePolicy({
    id,
    name,
    partnerShareRate,
    memo,
  }: {
    id?: string;
    name: string;
    partnerShareRate: number;
    memo?: string;
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/discount-share-policies`,
          {
            id: id,
            name: name,
            partnerShareRate: partnerShareRate,
            memo: memo,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }
  // 할인 분담 정책 조회
  async discountSharePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/discount-share-policies/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 할인 분담 정책 다건 조회
  async discountSharePolicies({
    page,
    filter,
  }: {
    page?: {
      number?: number;
      size?: number;
    };
    filter?: {
      isArchived?: boolean;
      partnerShareRates?: number[];
      keyword?: {
        id?: string;
        name?: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/discount-share-policies`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          data: {
            page: page,
            filter: filter,
          },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async archiveAdditionalFeePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/additional-fee-policies/${id}/archive`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async recoverAdditionalFeePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/additional-fee-policies/${id}/recover`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async updateAdditionalFeePolicy({
    id,
    name,
    fee,
    memo,
    vatPayer,
  }: {
    id?: string;
    name: string;
    fee: {
      fixedRate?: number;
      fixedAmount?: number;
    };
    memo?: string;
    vatPayer: string;
  }) {
    try {
      return await lastValueFrom(
        this.httpService.patch(
          `${this.option.apiHost}/platform/additional-fee-policies/${id}`,
          {
            name: name,
            fee: fee,
            memo: memo,
            vatPayer: vatPayer,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async createAdditionalFeePolicy({
    id,
    name,
    fee,
    memo,
    vatPayer,
  }: {
    id?: string;
    name: string;
    fee: {
      fixedRate?: number;
      fixedAmount?: number;
    };
    memo?: string;
    vatPayer: string;
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/additional-fee-policies`,
          {
            id: id,
            name: name,
            fee: fee,
            memo: memo,
            vatPayer: vatPayer,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (e) {
      this.logger.error(e);
      throw new PortoneApiException();
    }
  }
  // 할인 분담 정책 조회
  async additionalFeePolicy({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/additional-fee-policies/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 추가 수수료 정책 다건 조회
  async additionalFeePolicies({
    page,
    filter,
  }: {
    page?: {
      number?: number;
      size?: number;
    };
    filter?: {
      isArchived?: boolean;
      vatPayers?: string[];
      keyword?: {
        id?: string;
        name?: string;
        fee?: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/additional-fee-policies`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          data: {
            page: page,
            filter: filter,
          },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 다건 계약 조회
  async contracts({
    page,
    filter,
  }: {
    page?: {
      number?: number;
      size?: number;
    };
    filter?: {
      platformFeePayers: string[];
      cycleTypes: string[];
      datePolicies: string[];
      isArchived?: boolean;
      keyword?: {
        id?: string;
        name?: string;
        fee?: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/contracts`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          data: {
            page: page,
            filter: filter,
          },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 파트너 다건 조회
  async partners({
    page,
    filter,
  }: {
    page?: {
      number?: number;
      size?: number;
    };
    filter?: {
      memberCompanyConnectionStatuses: string[];
      taxationTypes: string[];
      types: string[];
      isArchived?: boolean;
      businessStatuses: string[];
      accountStatuses: string[];
      contractIds: string[];
      ids: string[];
      accountCurrencies: string[];
      banks: string[];
      tags: string[];
      keyword?: {
        id?: string;
        name?: string;
        email?: string;
        businessRegistrationNumber?: string;
        defaultContractId?: string;
        memo?: string;
        accountNumber?: string;
        accountHolder?: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/partners`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          data: {
            page: page,
            filter: filter,
          },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 파트너 조회
  async partner({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/partners/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  async recoverPartner({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/partners/${id}/recover`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 파트너 보관
  async archivePartner({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/partners/${id}/archive`,
          {},
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 파트너 생성
  async createPartners({
    id,
    name,
    contact,
    account,
    defaultContractId,
    memo,
    tags,
    type,
    userDefinedProperties,
  }: {
    id: string; // 파트너에 부여할 고유 아이디
    name: string; // 파트너 법인명 혹은 이름
    // 파트너 담당자 정보
    contact: {
      name: string; // 담당자 이름
      phoneNumber?: string; // 담당자 휴대폰 번호
      email: string; // 담당자 이메일
    };
    // 파트너 계좌 등록을 위한 정보
    // 파트너 계좌 정보가 다를 경우 불일치로 노출
    account: {
      bank: string; // 은행
      currency: string; // 통화 단위
      number: string; // 계좌번호
      holder: string; // 예금주명
      accountVerificationId?: string; // 계좌 검증 아이디
    };
    defaultContractId: string; // 기본 계약 아이디
    memo?: string; // 파트너에 대한 메모
    tags: Array<string>; //파트너에 부여할 태그 리스트
    // 파트너 생성을 위한 유형별 추가 정보
    // 사업자, 원천징수 대상자, 원천징수 비대상자 중 하나만 입력
    type: {
      business?: {
        companyName: string; // 상호명
        taxationType?: string; // 플랫폼 파트너 과세 유형
        businessRegistrationNumber: string; // 사업자등록번호
        representativeName: string; // 대표자 이름
        companyAddress?: string; // 사업장 주소
        businessType?: string; // 업태
        businessClass?: string; // 업종
        companyVerificationId?: string; // 사업자 조회 검증 아이디
      };
      whtPayer?: {
        birthdate?: string; // 생년월일
      };
      nonWhtPayer?: {
        birthdate?: string; // 생년월일
      };
    };
    userDefinedProperties?: {
      [key: string]: {
        string: string;
      };
    };
  }) {
    if (type.business === undefined && type.whtPayer === undefined && type.nonWhtPayer === undefined) {
      throw new Error('invalid request');
    }
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/partners`,
          {
            id: id,
            name: name,
            contact: contact,
            account: account,
            defaultContractId: defaultContractId,
            memo: memo,
            tags: tags,
            type: type,
            userDefinedProperties: userDefinedProperties,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 예금주 조회
  // 생년월일과 사업자등록번호 둘 중에 하나만 추가로 보낼 수 있다.
  // 은행과 계좌 번호가 정확하면 생년월일과 사업자등록번호와 관계없이 정상 처리된다.
  // 계좌 번호는 '-'를 제외한 계좌 번호지만 '-'가 포함되어도 정상적으로 처리된다.
  async holder({
    bank,
    accountNumber,
    birthdate,
    businessRegistrationNumber,
  }: {
    bank: string;
    accountNumber: string;
    birthdate?: string;
    businessRegistrationNumber?: string;
  }) {
    let url = `${this.option.apiHost}/platform/bank-accounts/${bank}/${accountNumber}/holder`;
    if (birthdate !== undefined) {
      url = url + `?${birthdate}`;
    } else if (businessRegistrationNumber !== undefined) {
      url = url + `?${businessRegistrationNumber}`;
    }
    try {
      return await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 주문 정산건 생성
  async order({
    partnerId,
    contractId,
    memo,
    paymentId,
    orderDetail,
    taxFeeAmount,
    settlementStartDate,
    discounts,
    additionalFees,
    externalPaymentDetail,
    isForTest,
    parameters,
    userDefinedProperties,
  }: {
    partnerId: string; // 파트너 아이디
    contractId?: string; // 계약 아이디
    memo?: string; // 메모
    paymentId: string; // 결제 아이디
    // 주문 정보
    // 주문 금액 또는 주문 항목 하나만 입력
    orderDetail: {
      orderAmount?: number; // 주문 금액
      // 주문 항목 리스트
      orderLines?: {
        // 상품
        product: {
          id: string; // 상품 아이디
          name: string; // 상품 이름
          amount: number; // 상품 금액
          taxFeeAmount?: number; // 상품 면세 금액
          tag?: string; // 태그
        };
        quantity: number; // 상품 수량
        // 상품 할인 정보
        discounts: {
          sharePolicyId: string; // 할인 분담 정책 아이디
          amount: number; // 할인 금액
          taxFeeAmount?: number; // 면세 할인 금액
        }[];
        // 상품 추가 수수료 정보
        additionalFees: {
          policyId: string; // 추가 수수료 정책 아이디
        }[];
      }[];
    };
    taxFeeAmount?: number; // 주문 면세 금액
    settlementStartDate?: string; // 정산 시작일
    // 할인 정보
    discounts: {
      sharePolicyId: string; // 할인 분담 정책 아이디
      amount: number; // 할인 금액
      taxFeeAmount?: number; // 면세 할인 금액
    }[];
    // 추가 수수료 정보
    additionalFees: {
      policyId: string; // 추가 수수료 정책 아이디
    }[];
    // 외부 결제 상세 정보
    externalPaymentDetail?: {
      currency: string; // 통화 단위
      orderName?: string; // 주문 명
      paidAt?: string; // 결제 일시
      // 결제 수단 입력 정보
      method?: {
        card?: Record<string, any>; // 카드
        transfer?: string; // 계좌이체
        virtualAccount?: string; // 가상계좌
        giftCertificate?: string; // 상품권
        mobile?: string; // 모바일
        // 간편 결제 입력 정보
        easyPay?: {
          provider?: string; // 간편 결제사
          methodType?: string; // 간편 결제 수단
        };
      };
    };
    isForTest?: boolean; // 테스트 모드 여부
    parameters?: {
      [key: string]: {
        decimal: number;
        decimalScale?: number;
      };
    };
    // 사용자 정의 속성
    userDefinedProperties?: {
      key: string;
      value: {
        string: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/transfers/order`,
          {
            partnerId: partnerId,
            contractId: contractId,
            memo: memo,
            paymentId: paymentId,
            orderDetail: orderDetail,
            taxFeeAmount: taxFeeAmount,
            settlementStartDate: settlementStartDate,
            discounts: discounts,
            additionalFees: additionalFees,
            externalPaymentDetail: externalPaymentDetail,
            isForTest: isForTest,
            parameters: parameters,
            userDefinedProperties: userDefinedProperties,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 주문 취소 정산건 생성
  async orderCancel({
    partnerId,
    paymentId,
    transferId,
    cancellationId,
    memo,
    orderDetail,
    taxFeeAmount,
    discounts,
    settlementStartDate,
    externalCancellationDetail,
    isForTest,
    userDefinedProperties,
  }: {
    partnerId?: string; // 파트너 아이디
    paymentId?: string; // 결제 아이디
    transferId?: string; // 정산건 아이디
    cancellationId: string; // 취소 내역 아이디
    memo?: string; // 메모
    // 주문 정보
    // 주문 금액 또는 주문 항목 하나만 입력
    orderDetail: {
      orderAmount?: number; // 주문 금액
      // 주문 항목 리스트
      orderLines?: {
        // 상품
        productId: string; // 상품 아이디
        quantity: number; // 상품 수량
        // 상품 할인 정보
        discounts: {
          sharePolicyId: string; // 할인 분담 정책 아이디
          amount: number; // 할인 금액
          taxFeeAmount?: number; // 면세 할인 금액
        }[];
      }[];
      all?: Record<string, never>;
    };
    taxFeeAmount?: number; // 주문 면세 금액
    // 할인 정보
    discounts: {
      sharePolicyId: string; // 할인 분담 정책 아이디
      amount: number; // 할인 금액
      taxFeeAmount?: number; // 면세 할인 금액
    }[];
    settlementStartDate?: string; // 정산 시작일
    // 외부 결제 상세 정보
    externalCancellationDetail?: {
      cancelledAt?: string;
    };
    isForTest?: boolean; // 테스트 모드 여부
    // 사용자 정의 속성
    userDefinedProperties?: {
      key: string;
      value: {
        string: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/transfers/order-cancel`,
          {
            partnerId: partnerId,
            paymentId: paymentId,
            transferId: transferId,
            cancellationId: cancellationId,
            memo: memo,
            orderDetail: orderDetail,
            taxFeeAmount: taxFeeAmount,
            discounts: discounts,
            settlementStartDate: settlementStartDate,
            externalCancellationDetail: externalCancellationDetail,
            isForTest: isForTest,
            userDefinedProperties: userDefinedProperties,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 수기 정산건 생성
  async manual({
    partnerId,
    settlementAmount,
    settlementDate,
    memo,
    isForTest,
    userDefinedProperties,
  }: {
    partnerId: string;
    settlementAmount: number;
    settlementDate: string;
    isForTest?: boolean;
    memo?: string; // 메모
    // 사용자 정의 속성
    userDefinedProperties?: {
      key: string;
      value: {
        string: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.post(
          `${this.option.apiHost}/platform/transfers/manual`,
          {
            partnerId: partnerId,
            settlementAmount: settlementAmount,
            settlementDate: settlementDate,
            memo: memo,
            isForTest: isForTest,
            userDefinedProperties: userDefinedProperties,
          },
          {
            headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          },
        ),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 정산건 다건 조회
  async transfers({
    page,
    filter,
  }: {
    page?: {
      number?: number;
      size?: number;
    };
    filter?: {
      settlementStartDateRange?: {
        from: string;
        until: string;
      };
      settlementDateRange?: {
        from: string;
        until: string;
      };
      partnerTags?: string[];
      contractIds?: string[];
      discountSharePolicyIds?: string[];
      additionalFeePolicyIds?: string[];
      paymentMethodTypes?: string[];
      channelKeys?: string[];
      types?: string[];
      statuses?: string[];
      isForTest?: boolean;
      keyword?: {
        all?: string;
        paymentId?: string;
        transferId?: string;
        transferMemo?: string;
        productId?: string;
        productName?: string;
        partnerId?: string;
        partnerName?: string;
        partnerMemo?: string;
      };
    };
  }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/transfer-summaries`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
          data: {
            page: page,
            filter: filter,
          },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 정산건 조회
  async transfer({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/transfers/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 정산건 삭제
  async deleteTransfer({ id }: { id: string }) {
    try {
      return await lastValueFrom(
        this.httpService.delete(`${this.option.apiHost}/platform/transfers/${id}`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 정산 내역 다건 조회
  async partnerSettlements() {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/platform/partner-settlements`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
  // 은행 정보 조회
  async banks() {
    try {
      return await lastValueFrom(
        this.httpService.get(`${this.option.apiHost}/banks`, {
          headers: { Authorization: `PortOne ${this.option.apiSecret}` },
        }),
      );
    } catch (err) {
      this.logger.error(err);
      throw new PortoneApiException();
    }
  }
}
