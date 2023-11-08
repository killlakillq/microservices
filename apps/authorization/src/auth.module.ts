import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/interfaces/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './services/strategies/access-token.strategy';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './services/strategies/refresh-token.strategy';
import { TokenService } from './services/token.service';
import { TypeOrmConfig } from './common/configs/typeorm';
import { CryptoHelper } from './helpers/crypto.helper';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		JwtModule.register({}),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfig,
		}),
	],
	providers: [AuthService, JwtService, AccessTokenStrategy, RefreshTokenStrategy, CryptoHelper, TokenService],
	controllers: [AuthController],
})
export class AuthModule {}
