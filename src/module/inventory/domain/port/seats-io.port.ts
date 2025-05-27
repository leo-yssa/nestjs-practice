export interface ISeatsIOPort {
  holdSeats(eventId: string, seats: string[]): Promise<void>;
  bookSeats(eventId: string, seats: string[], holdToken: string): Promise<void>;
  releaseSeats(eventId: string, seats: string[]): Promise<void>;
}
