import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { UserVO } from './vo/user.vo';

@Injectable()
export class UserFactory {
  constructor(private eventBus: EventBus) {}

  create(
    id: string,
    securityCode: string,
    countryCode: number,
    phoneNumber: string,
  ): UserVO {
    const user = new UserVO(id, securityCode, countryCode, phoneNumber);

    this.eventBus.publish(
      new UserCreatedEvent(id, securityCode, countryCode, phoneNumber),
    );

    return user;
  }
}
