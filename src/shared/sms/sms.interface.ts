export interface ISmsProvider {
  send(to: string, message: string, countryCode?: string): Promise<void>;
}
