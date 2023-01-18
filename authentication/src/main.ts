import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions, MicroserviceOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

import { ConfigService } from './services/config/config.service';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.TCP,
		options: {
			host: '0.0.0.0',
			port: new ConfigService().get('port'),
		},
	} as TcpOptions);
	await app.listen();
}
bootstrap();
