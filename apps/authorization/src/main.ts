import { HttpException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	Logger.log('[NestFactory] Authorization service started');
	const config = new ConfigService();
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
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
