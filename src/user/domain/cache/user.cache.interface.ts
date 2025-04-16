export interface IUserCache {
  create(key, value, ttl): Promise<void>;
  get(key): Promise<string>;
}
