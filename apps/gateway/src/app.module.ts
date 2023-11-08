import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './common/guards/auth.guard';
import { AccountController } from './controllers/account.controller';
import { InternetController } from './controllers/internet.controller';
import { MobileController } from './controllers/mobile.controller';
import { UtilitiesController } from './controllers/utilities.controller';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [AuthController, AccountController, InternetController, MobileController, UtilitiesController],
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
		{
			provide: 'ACCOUNT_SERVICE',
			useFactory: (configService: ConfigService) => {
				const accountServiceOptions = configService.get('accountService');
				return ClientProxyFactory.create(accountServiceOptions);
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
