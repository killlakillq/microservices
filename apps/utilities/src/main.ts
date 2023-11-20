import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { UtilitiesModule } from './utilities.module';
import { ExceptionFilter } from '@microservices/filters';
import { Config } from '@microservices/config';

async function bootstrap() {
	Logger.log('[NestFactory] Utilities service started');
	const config = new Config();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(UtilitiesModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('UTILITIES_SERVICE_HOST'),
			port: parseInt(config.get('UTILITIES_SERVICE_PORT')),
		},
	} as TcpOptions);
	app.useGlobalFilters(new ExceptionFilter());
	await app.listen();
}
bootstrap();
