import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountEntity } from './interfaces/entities/account.entity';
import { CardEntity } from './interfaces/entities/card.entity';
import { AccountService } from './services/account.service';
import { ConfigService } from './services/config/config.service';
import { TypeOrmConfigService } from './services/config/orm-config.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forFeature([AccountEntity, CardEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
	],
	controllers: [AccountController],
	providers: [AccountService, ConfigService],
})
export class AccountModule {}
