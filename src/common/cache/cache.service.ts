import redisClient from "../../config/redis";
import type { CacheService } from "./cache.types";

class RedisCacheService implements CacheService {
  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await redisClient.set(key, serialized, { EX: ttlSeconds });
    } else {
      await redisClient.set(key, serialized);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await redisClient.keys(pattern);
    if (keys.length) {
      await redisClient.del(keys);
    }
  }
}

export const cacheService = new RedisCacheService();
