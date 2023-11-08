import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	Logger.log('[NestFactory] Gateway started');
	const config = new ConfigService();
	const app = await NestFactory.create(AppModule);
	await app.listen(config.get('port'));
}
bootstrap();
