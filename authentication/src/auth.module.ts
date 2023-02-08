import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/config/orm-config.service';
import { UserEntity } from './interfaces/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './services/strategies/accessToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './services/config/config.service';
import { RefreshTokenStrategy } from './services/strategies/refreshToken.strategy';
import { CryptoConfigService } from './services/config/crypto-config.service';
import { TokenService } from './services/token.service';
import { RedisConfigService } from './services/config/redis-config.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		JwtModule.register({}),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
	],
	providers: [
		AuthService,
		JwtService,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		CryptoConfigService,
		ConfigService,
		TokenService,
		{
			provide: 'REDIS',
			useValue: RedisConfigService,
		},
	],
	controllers: [AuthController],
})
export class AuthModule {}