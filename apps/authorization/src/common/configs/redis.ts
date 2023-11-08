import * as dotenv from 'dotenv';
dotenv.config();

export const redisConfig = {
	host: process.env.REDIS_HOST,
	port: Number(process.env.REDIS_PORT),
	username: process.env.REDIS_USERNAME,
	password: process.env.REDIS_PASSWORD,
	db: Number(process.env.REDIS_DATABASE),
};
