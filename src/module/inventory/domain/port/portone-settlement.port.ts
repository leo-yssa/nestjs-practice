import { PortoneSettlementOrderInputVO } from '@inventory/domain/vo/portone-settlement.vo';

export interface PortoneSettlementPort {
  portoneSettlementOrder(portoneSettlementOrderInputVo: PortoneSettlementOrderInputVO): Promise<void>;
}
