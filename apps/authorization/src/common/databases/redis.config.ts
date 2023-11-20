import { Config } from '@microservices/config';

const config = new Config();

export const redisOptions = {
	host: config.get('REDIS_HOST'),
	port: parseInt(config.get('REDIS_PORT')),
	username: config.get('REDIS_USERNAME'),
	password: config.get('REDIS_PASSWORD'),
	db: parseInt(config.get('REDIS_DATABASE')),
};
