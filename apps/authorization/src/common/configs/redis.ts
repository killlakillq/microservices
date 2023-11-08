import Redis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

export const RedisConfig = new Redis({
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
	username: process.env.REDIS_USERNAME,
	password: process.env.REDIS_PASSWORD,
	db: Number(process.env.REDIS_DATABASE),
});
