import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Config } from '@microservices/config';

async function bootstrap() {
	Logger.log('[NestFactory] Gateway started');
	const config = new Config();
	const app = await NestFactory.create(GatewayModule);
	await app.listen(config.get('GATEWAY_PORT'));
}
bootstrap();
