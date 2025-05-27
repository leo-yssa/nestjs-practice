import { Injectable } from '@nestjs/common';
import { ISeatsIOPort } from '@inventory/domain/port/seats-io.port';
import { SeatsIOService } from '@seats-io/seats-io.service';
@Injectable()
export class SeatsIOAdapter implements ISeatsIOPort {
  constructor(private readonly seatsIoService: SeatsIOService) {}

  async holdSeats(eventId: string, seats: string[]): Promise<void> {
    await this.seatsIoService.holdSeats(eventId, seats);
  }

  async bookSeats(eventId: string, seats: string[], holdToken: string): Promise<void> {
    await this.seatsIoService.bookSeats(eventId, seats, holdToken);
  }

  async releaseSeats(eventId: string, seats: string[]): Promise<void> {
    await this.seatsIoService.releaseSeats(eventId, seats);
  }
}
