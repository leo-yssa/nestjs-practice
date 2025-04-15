import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/users/domain/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private logger: Logger) {}

  async handle(event: UserCreatedEvent) {
    switch (event.name) {
      case UserCreatedEvent.name: {
        const { id, securityCode, countryCode, phoneNumber } =
          event as UserCreatedEvent;
        this.logger.log(id, securityCode, countryCode, phoneNumber);
        break;
      }
      default:
        break;
    }
  }
}
