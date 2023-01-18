import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthGuard } from './services/guards/authorization.guard';

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		{
			provide: 'AUTH_SERVICE',
			useFactory: (configService: ConfigService) => {
				const authServiceOptions = configService.get('authService');
				return ClientProxyFactory.create(authServiceOptions);
			},
			inject: [ConfigService],
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
