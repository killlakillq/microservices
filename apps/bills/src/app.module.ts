import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './common/config/config';
import { TypeOrmConfigService } from './common/config/orm-config';
import { AccountEntity } from './account/entities/account.entity';
import { InternetEntity } from './internet/entities/internet.entity';
import { MobileEntity } from './mobile/entities/mobile.entity';
import { UtilitiesEntity } from './utilities/entities/utilities.entity';
import { UtilitiesModule } from './utilities/utilities.module';
import { MobileModule } from './mobile/mobile.module';
import { InternetModule } from './internet/internet.module';
import { AccountModule } from './account/account.module';

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
