import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

@Injectable()
export class TokenService {
	constructor(
		@Inject('REDIS') private readonly redisService: Redis,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public async saveTokens(id: string, email: string): Promise<void> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{ id, email },
				{ secret: this.configService.get('JWT_ACCESS_SECRET'), expiresIn: '15m' },
			),
			this.jwtService.signAsync(
				{ id, email },
				{ secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' },
			),
		]);

		const redis = this.redisService.pipeline();
		await redis
			.set(email + ' [access]', accessToken)
			.set(email + ' [refresh]', refreshToken)
			.exec();
	}

	public async getTokens(email: string): Promise<{ accessToken: unknown, refreshToken: unknown }> {
		const redis = this.redisService.pipeline();
		const tokens = await redis
			.get(email + ' [access]')
			.get(email + ' [refresh]')
			.exec();
		return {
			accessToken: tokens[0][1],
			refreshToken: tokens[1][1]
		}
	}
}
