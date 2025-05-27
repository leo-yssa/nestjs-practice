import { BioAuthVO } from '@auth/domain/vo/auth.vo';

export interface IBioService {
  verifySignature(bioAuthVo: BioAuthVO, publicKey: string): Promise<boolean>;
}
