export interface IAuthCache {
  create(key: string, value: string, ttl: number): Promise<void>;
  get(key: string): Promise<string>;
}
