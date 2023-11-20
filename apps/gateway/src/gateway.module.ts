import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthGuard } from './common/guards/auth.guard';
import { AccountController } from './controllers/bills/account.controller';
import { InternetController } from './controllers/bills/internet.controller';
import { MobileController } from './controllers/bills/mobile.controller';
import { UtilitiesController } from './controllers/bills/utilities.controller';
import { Config } from '@microservices/config';

@Module({
	imports: [],
	controllers: [AuthController, AccountController, InternetController, MobileController, UtilitiesController],
	providers: [
		Config,
		{
			provide: 'AUTH_SERVICE',
			useFactory: (config: Config) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: config.get('AUTH_SERVICE_HOST'),
						port: parseInt(config.get('AUTH_SERVICE_PORT')),
					},
				});
			},
			inject: [Config],
		},
		{
			provide: 'ACCOUNT_SERVICE',
			useFactory: (config: Config) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: config.get('ACCOUNT_SERVICE_HOST'),
						port: parseInt(config.get('ACCOUNT_SERVICE_PORT')),
					},
				});
			},
			inject: [Config],
		},
		{
			provide: 'INTERNET_SERVICE',
			useFactory: (config: Config) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: config.get('INTERNET_SERVICE_HOST'),
						port: parseInt(config.get('INTERNET_SERVICE_PORT')),
					},
				});
			},
			inject: [Config],
		},
		{
			provide: 'MOBILE_SERVICE',
			useFactory: (config: Config) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: config.get('MOBILE_SERVICE_HOST'),
						port: parseInt(config.get('MOBILE_SERVICE_PORT')),
					},
				});
			},
			inject: [Config],
		},
		{
			provide: 'UTILITIES_SERVICE',
			useFactory: (config: Config) => {
				return ClientProxyFactory.create({
					transport: Transport.TCP,
					options: {
						host: config.get('UTILITIES_SERVICE_HOST'),
						port: parseInt(config.get('UTILITIES_SERVICE_PORT')),
					},
				});
			},
			inject: [Config],
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class GatewayModule {}
