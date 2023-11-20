import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { MobileModule } from './mobile.module';
import { Config } from '@microservices/config';
import { ExceptionFilter } from '@microservices/filters';

async function bootstrap() {
	Logger.log('[NestFactory] Mobile service started');
	const config = new Config();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(MobileModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('MOBILE_SERVICE_HOST'),
			port: parseInt(config.get('MOBILE_SERVICE_PORT')),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
