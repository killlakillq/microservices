import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: configService.get('JWT_REFRESH_SECRET'),
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async validate(req: Request, payload: any) {
		const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
		return { ...payload, refreshToken };
	}
}
