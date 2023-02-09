import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { AuthController } from './auth.controller';
import { ConfigService } from './services/config/config.service';
import { AuthGuard } from './services/guards/auth.guard';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [AuthController, AccountController],
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
		}
	],
})
export class AppModule {}
