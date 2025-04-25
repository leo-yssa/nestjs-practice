import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfig {
  readonly credentials: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
  };
  readonly projectId: string;

  constructor(private configService: ConfigService) {
    this.projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    this.credentials = {
      type: this.configService.get<string>('FIREBASE_TYPE'),
      project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: this.configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: this.configService.get<string>('FIREBASE_AUTH_URI'),
      token_uri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: this.configService.get<string>('FIREBASE_AUTH_PROVIDER_CERT_URL'),
      client_x509_cert_url: this.configService.get<string>('FIREBASE_CLIENT_CERT_URL'),
    };
  }
} 