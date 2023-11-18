import { HttpException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { MobileModule } from './mobile.module';

async function bootstrap() {
	Logger.log('[NestFactory] Mobile service started');
	const config = new ConfigService();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(MobileModule, {
		transport: Transport.TCP,
		options: {
			host: config.get('HOST'),
			port: config.get('PORT'),
		},
	} as TcpOptions);
	app.useGlobalFilters(new HttpExceptionFilter<HttpException>());
	await app.listen();
}
bootstrap();
