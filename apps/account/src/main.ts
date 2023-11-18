import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';
import { ExceptionFilter } from '@microservices/filters';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	Logger.log('[NestFactory] Account service started');
	const config = new ConfigService();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AccountModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('HOST'),
			port: config.get('PORT'),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
