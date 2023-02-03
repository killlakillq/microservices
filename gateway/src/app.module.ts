import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AccountController } from './account.controller';
import { AuthController } from './auth.controller';
import { ConfigService } from './services/config/config.service';

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
	],
})
export class AppModule {}
