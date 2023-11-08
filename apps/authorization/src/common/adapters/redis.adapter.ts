import Redis from 'ioredis';
import { redisConfig } from '../configs/redis';

export class RedisAdapter {
	private redis: Redis;

	public constructor() {
		this.redis = new Redis(redisConfig);
	}

	public async set(key: string, data: string, ttl: number) {
		await this.redis.set(key, data);
		return this.redis.expire(key, ttl);
	}

	public async get(key: string) {
		return await this.redis.get(key);
	}
}
