import { Injectable, Logger } from '@nestjs/common';
import { Region, SeatsioClient } from 'seatsio';
import { SeatsIOOptions } from './seats-io.options';
import { SeatsIOInterface } from './seats-io.interface';
import {
  SeatsHoldFailedException,
  SeatsConfirmFailedException,
  SeatsReleaseFailedException,
} from './seats-io.exception';

@Injectable()
export class SeatsIOService implements SeatsIOInterface {
  private readonly client: SeatsioClient;
  private readonly logger = new Logger(SeatsIOService.name);

  constructor(private readonly options: SeatsIOOptions) {
    this.client = new SeatsioClient(Region.OC(), options.workspaceKey);
  }

  async holdSeats(eventKey: string, seats: string[]): Promise<void> {
    try {
      const result = await this.client.holdTokens.create(
        this.options.holdPeriod,
      );
      await this.client.events.hold(eventKey, seats, result.holdToken);
      this.logger.debug(
        `Successfully held seats ${seats.join(', ')} for event ${eventKey}`,
      );
    } catch (error) {
      this.logger.error(`Failed to hold seats: ${error.message}`);
      throw new SeatsHoldFailedException();
    }
  }

  async bookSeats(
    eventKey: string,
    seats: string[],
    holdToken: string,
  ): Promise<void> {
    try {
      await this.client.events.book(eventKey, seats, holdToken);
      this.logger.debug(
        `Successfully confirmed seats ${seats.join(', ')} for event ${eventKey}`,
      );
    } catch (error) {
      this.logger.error(`Failed to confirm seats: ${error.message}`);
      throw new SeatsConfirmFailedException();
    }
  }

  async releaseSeats(eventKey: string, seats: string[]): Promise<void> {
    try {
      await this.client.events.release(eventKey, seats);
      this.logger.debug(
        `Successfully released seats ${seats.join(', ')} for event ${eventKey}`,
      );
    } catch (error) {
      this.logger.error(`Failed to release seats: ${error.message}`);
      throw new SeatsReleaseFailedException();
    }
  }
}
