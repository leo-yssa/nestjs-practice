import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';
import { IBioService } from '@auth/domain/service/bio-service.interface';
import { BioAuthVO } from '@auth/domain/vo/auth.vo';

@Injectable()
export class BioService implements IBioService {
  constructor() {}

  async verifySignature(bioAuthVo: BioAuthVO, publicKey: string): Promise<boolean> {
    const asn1 = forge.asn1.fromDer(this.decode64(publicKey));
    const publicKeyObj = forge.pki.publicKeyFromAsn1(asn1);
    const md = forge.md.sha256.create();
    md.update(bioAuthVo.message, 'utf8');
    return publicKeyObj.verify(md.digest().bytes(), this.decode64(bioAuthVo.signature));
  }

  private decode64(base64: string): forge.Bytes {
    return forge.util.decode64(base64);
  }
}
