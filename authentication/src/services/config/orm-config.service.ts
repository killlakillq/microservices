import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			host: process.env.TYPEORM_HOST,
			port: parseInt(process.env.TYPEORM_PORT),
			username: process.env.TYPEORM_USERNAME,
			password: process.env.TYPEORM_PASSWORD,
			database: process.env.TYPEORM_DATABASE,
			synchronize: true,
			logging: true,
			entities: [__dirname + '/../**/*.entity.{js,ts}'],
			subscribers: [],
			migrations: [],
		};
	}
}