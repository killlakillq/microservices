import { HttpException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { InternetModule } from './internet.module';

async function bootstrap() {
	Logger.log('[NestFactory] Internet service started');
	const config = new ConfigService();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(InternetModule, {
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
