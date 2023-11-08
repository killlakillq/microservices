import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserEntity } from '../interfaces/entities/user.entity';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
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
			entities: [UserEntity],
			subscribers: [],
			migrations: [],
		};
	}
}
