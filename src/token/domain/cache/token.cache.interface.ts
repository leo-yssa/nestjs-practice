export interface ITokenCache {
  create(key, value, ttl): Promise<void>;
  get(key): Promise<string>;
}
