
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AccountEntity } from '../../interfaces/entities/account.entity';
import { InternetEntity } from '../../interfaces/entities/internet.entity';
import { MobileEntity } from '../../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from '../../interfaces/entities/utilities.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
		return {
			type: 'postgres',
			host: this.configService.get('TYPEORM_HOST'),
			port: this.configService.get('TYPEORM_PORT'),
			username: this.configService.get('TYPEORM_USERNAME'),
			password: this.configService.get('TYPEORM_PASSWORD'),
			database: this.configService.get('TYPEORM_DATABASE'),
			synchronize: true,
			logging: true,
			entities: [AccountEntity, InternetEntity, MobileEntity, UtilitiesEntity],
			subscribers: [],
			migrations: [],
		};
	}
}
