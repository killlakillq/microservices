import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './common/config/config';
import { TypeOrmConfigService } from './common/config/orm-config';
import { AccountEntity } from './modules/account/entities/account.entity';
import { InternetEntity } from './modules/internet/entities/internet.entity';
import { MobileEntity } from './modules/mobile/entities/mobile.entity';
import { UtilitiesEntity } from './modules/utilities/entities/utilities.entity';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { InternetModule } from './modules/internet/internet.module';
import { AccountModule } from './modules/account/account.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forFeature([AccountEntity, InternetEntity, MobileEntity, UtilitiesEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
		UtilitiesModule,
		MobileModule,
		InternetModule,
		AccountModule,
	],
	providers: [ConfigService],
})
export class AppModule {}
