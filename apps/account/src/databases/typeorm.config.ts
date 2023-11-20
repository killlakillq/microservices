import { Config } from '@microservices/config';
import { AccountEntity } from '@microservices/models';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmOptions implements TypeOrmOptionsFactory {
	constructor(private readonly config: Config) {}

	createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
		return {
			type: 'postgres',
			host: this.config.get('TYPEORM_HOST'),
			port: parseInt(this.config.get('TYPEORM_PORT')),
			username: this.config.get('TYPEORM_USERNAME'),
			password: this.config.get('TYPEORM_PASSWORD'),
			database: this.config.get('TYPEORM_DATABASE'),
			synchronize: true,
			logging: true,
			entities: [AccountEntity],
			subscribers: [],
			migrations: [],
		};
	}
}
