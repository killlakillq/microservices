import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { AccountModule } from './account.module';
import { ConfigService } from './services/config/config.service';

// async function bootstrap() {
// 	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AccountModule, {
// 		transport: Transport.TCP,
// 		options: {
// 			host: new ConfigService().get('HOST'),
// 			port: new ConfigService().get('PORT'),
// 		},
// 	} as TcpOptions);
// 	await app.listen();
// }
// bootstrap();

async function bootstrap() {
	const app = await NestFactory.create(AccountModule);
	await app.listen(3000);
}
bootstrap();
