import Redis from 'ioredis';
import { redisOptions } from '../databases/redis.config';

export class RedisAdapter {
	private redis: Redis;

	public constructor() {
		this.redis = new Redis(redisOptions);
	}

	public async set(key: string, data: string, ttl: number) {
		await this.redis.set(key, data);
		return this.redis.expire(key, ttl);
	}

	public async get(key: string) {
		return await this.redis.get(key);
	}
}
