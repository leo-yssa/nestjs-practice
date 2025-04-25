import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';

@Injectable()
export class BioService {
  constructor() {}

  async verifySignature(
    publicKey: string,
    signature: string,
    msg: string,
  ): Promise<boolean> {
    const asn1 = forge.asn1.fromDer(this.decode64(publicKey));
    const publicKeyObj = forge.pki.publicKeyFromAsn1(asn1);
    const md = forge.md.sha256.create();
    md.update(msg, 'utf8');
    return publicKeyObj.verify(md.digest().bytes(), this.decode64(signature));
  }

  private decode64(base64: string): forge.Bytes {
    return forge.util.decode64(base64);
  }
}
