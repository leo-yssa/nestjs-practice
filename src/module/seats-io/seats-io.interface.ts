export interface SeatsIOInterface {
  holdSeats(eventKey: string, seats: string[]): Promise<void>;
  bookSeats(eventKey: string, seats: string[], holdToken: string): Promise<void>;
  releaseSeats(eventKey: string, seats: string[]): Promise<void>;
}
