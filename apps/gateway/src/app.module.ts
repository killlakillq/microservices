import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthGuard } from './common/guards/auth.guard';
import { AccountController } from './controllers/bills/account.controller';
import { InternetController } from './controllers/bills/internet.controller';
import { MobileController } from './controllers/bills/mobile.controller';
import { UtilitiesController } from './controllers/bills/utilities.controller';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [AuthController, AccountController, InternetController, MobileController, UtilitiesController],
	providers: [
		ConfigService,
		{
			provide: 'AUTH_SERVICE',
			useFactory: (configService: ConfigService) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: configService.get('AUTH_SERVICE_HOST'),
						port: configService.get('AUTH_SERVICE_PORT'),
					},
				});
			},
			inject: [ConfigService],
		},
		{
			provide: 'ACCOUNT_SERVICE',
			useFactory: (configService: ConfigService) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: configService.get('ACCOUNT_SERVICE_HOST'),
						port: configService.get('ACCOUNT_SERVICE_PORT'),
					},
				});
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
