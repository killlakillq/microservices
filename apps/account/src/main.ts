import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';
import { ExceptionFilter } from '@microservices/filters';
import { Config } from '@microservices/config';

async function bootstrap() {
	Logger.log('[NestFactory] Account service started');
	const config = new Config();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AccountModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('ACCOUNT_SERVICE_HOST'),
			port: parseInt(config.get('ACCOUNT_SERVICE_PORT')),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
