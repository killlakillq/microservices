import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserPayload } from '../../common/interfaces/user.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	public constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			passReqToCallback: true,
			secretOrKey: configService.get('JWT_REFRESH_SECRET'),
		});
	}

	async validate(req: Request, payload: UserPayload) {
		const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
		return { ...payload, refreshToken };
	}
}
