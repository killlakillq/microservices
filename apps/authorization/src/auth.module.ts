import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../libs/models/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './services/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './services/strategies/refresh-token.strategy';
import { TokenService } from './services/token.service';
import { TypeOrmOptions } from './common/databases/typeorm.config';
import { Config } from '@microservices/config';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({}),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forRootAsync({
			imports: [Config],
			useClass: TypeOrmOptions,
		}),
	],
	providers: [AuthService, JwtService, AccessTokenStrategy, RefreshTokenStrategy, TokenService],
	controllers: [AuthController],
})
export class AuthModule {}
