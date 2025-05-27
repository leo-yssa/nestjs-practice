export interface IInventoryCache {
  savePortoneAccessToken(accessToken: string, ttl: number): Promise<void>;
  getPortoneAccessToken(): Promise<string>;
}
