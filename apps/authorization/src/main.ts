import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { ExceptionFilter } from '@microservices/filters';
import { Config } from '@microservices/config';

async function bootstrap() {
	Logger.log('[NestFactory] Authorization service started');
	const config = new Config();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('AUTH_SERVICE_HOST'),
			port: parseInt(config.get('AUTH_SERVICE_PORT')),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
