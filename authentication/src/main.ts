import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions, RedisOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

import { ConfigService } from './services/config/config.service';

// async function bootstrap() {
// 	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
// 		transport: Transport.REDIS,
// 		options: {
// 			host: new ConfigService().get('HOST'),
// 			port: new ConfigService().get('PORT'),
// 		},
// 	} as RedisOptions);
// 	await app.listen();
// }
// bootstrap();


async function bootstrap() {
	const app = await NestFactory.create(AuthModule);
	await app.listen(3000);
}
bootstrap();