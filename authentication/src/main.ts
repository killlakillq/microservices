import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, TcpOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.TCP,
		options: {
			host: new ConfigService().get('HOST'),
			port: new ConfigService().get('PORT'),
		},
	} as TcpOptions);
	await app.listen();
}
bootstrap();