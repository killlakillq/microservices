import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisAdapter } from '../common/adapters/redis.adapter';
import { Tokens } from '../common/interfaces/tokens.interface';

@Injectable()
export class TokenService {
	constructor(
		private readonly redisAdapter: RedisAdapter,
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

		await this.redisAdapter.set('access', accessToken, 20);
		await this.redisAdapter.set('refresh', refreshToken, 20);
	}

	public async getTokens(): Promise<Tokens> {
		const accessToken = await this.redisAdapter.get('access');
		const refreshToken = await this.redisAdapter.get('refresh');

		return {
			accessToken,
			refreshToken,
		};
	}

	public async verifyToken(jwt: string): Promise<string[]> {
		const token = jwt.replace('Bearer', '').trim();
		return this.jwtService.verify(token, { secret: this.configService.get('JWT_ACCESS_SECRET') });
	}
}
