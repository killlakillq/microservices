import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { ConfigService } from './services/config/config.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
	],
	controllers: [AuthController],
	providers: [
		ConfigService,
		{
			provide: 'AUTH_SERVICE',
			useFactory: (configService: ConfigService) => {
				const authServiceOptions = configService.get('authService');
				return ClientProxyFactory.create(authServiceOptions);
			},
			inject: [ConfigService],
		},
	],
})
export class AppModule {}
