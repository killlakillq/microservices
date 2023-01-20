import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/config/orm-config.service';
import { UserEntity } from './interfaces/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConfigService } from './services/config/jwt-config.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from './services/config/config.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useClass: JwtConfigService,
		}),
		TypeOrmModule.forFeature([UserEntity]),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: TypeOrmConfigService,
		}),
	],
	providers: [AuthService, JwtService, JwtStrategy, ConfigService],
	controllers: [AuthController],
})
export class AuthModule {}