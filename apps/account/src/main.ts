import { HttpException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';
import { ConfigService } from './common/config/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
	Logger.log('[NestFactory] Account service started');
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AccountModule, {
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
