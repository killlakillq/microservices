import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '@microservices/models';
import { TypeOrmOptions } from './databases/typeorm.config';
import { Config } from '@microservices/config';

@Module({
	imports: [
		TypeOrmModule.forFeature([AccountEntity]),
		TypeOrmModule.forRootAsync({
			inject: [Config],
			useClass: TypeOrmOptions,
		}),
	],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
