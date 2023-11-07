import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountEntity } from './interfaces/entities/account.entity';
import { InternetEntity } from './interfaces/entities/internet.entity';
import { MobileEntity } from './interfaces/entities/mobile.entity';
import { UtilitiesEntity } from './interfaces/entities/utilities.entity';
import { AccountService } from './services/account.service';
import { ConfigService } from './common/config/config';
import { TypeOrmConfigService } from './common/config/orm-config';
import { InternetPaymentService } from './services/payments/internet-payment.service';
import { MobilePaymentService } from './services/payments/mobile-payment.service';
import { UtilitiesPaymentService } from './services/payments/utilities-payment.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forFeature([AccountEntity, InternetEntity, MobileEntity, UtilitiesEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
	],
	controllers: [AccountController],
	providers: [AccountService, ConfigService, InternetPaymentService, MobilePaymentService, UtilitiesPaymentService],
})
export class AccountModule {}
