import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { InternetModule } from './internet.module';
import { ExceptionFilter } from '@microservices/filters';
import { Config } from '@microservices/config';

async function bootstrap() {
	Logger.log('[NestFactory] Internet service started');
	const config = new Config();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(InternetModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('INTERNET_SERVICE_HOST'),
			port: parseInt(config.get('INTERNET_SERVICE_PORT')),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
