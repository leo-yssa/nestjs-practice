import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseOptions } from './firebase.options';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;

  constructor(private readonly options: FirebaseOptions) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(options.credentials as ServiceAccount),
      projectId: options.projectId,
    });
  }

  async sendPushNotification(
    registrationTokens: string[],
    title: string,
    body: string,
    data?: Record<string, any>,
    options?: {
      badgeCount?: number;
      soundChannel?: string;
      analyticsLabel?: string;
    },
  ): Promise<admin.messaging.BatchResponse> {
    const message: admin.messaging.MulticastMessage = {
      tokens: registrationTokens,
      notification: {
        title,
        body,
      },
      data: data || {},
      android: {
        notification: {
          channelId: options?.soundChannel || 'sound_channel',
          notificationCount: options?.badgeCount,
        },
      },
      apns: {
        payload: {
          aps: {
            badge: options?.badgeCount,
            sound: 'default',
          },
        },
      },
      fcmOptions: {
        analyticsLabel: options?.analyticsLabel,
      },
    };

    return this.app.messaging().sendEachForMulticast(message);
  }

  async sendSilentNotification(
    registrationTokens: string[],
    badgeCount: number,
    data?: Record<string, any>,
  ): Promise<admin.messaging.BatchResponse> {
    const message: admin.messaging.MulticastMessage = {
      tokens: registrationTokens,
      data: data || {},
      android: {
        notification: {
          notificationCount: badgeCount,
        },
      },
      apns: {
        payload: {
          aps: {
            badge: badgeCount,
            contentAvailable: true,
          },
        },
      },
      fcmOptions: {
        analyticsLabel: 'silence',
      },
    };

    return this.app.messaging().sendEachForMulticast(message);
  }
}
