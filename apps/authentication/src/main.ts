import { HttpException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

import { ConfigService } from './services/config/config.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
	Logger.log('[NestFactory] Authentication service started');
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.TCP,
		options: {
			host: new ConfigService().get('HOST'),
			port: new ConfigService().get('PORT'),
		},
	} as TcpOptions);
	app.useGlobalFilters(new HttpExceptionFilter<HttpException>());
	await app.listen();
}
bootstrap();
