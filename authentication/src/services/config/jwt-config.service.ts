import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
	constructor(private readonly configService: ConfigService) {}

	createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
		return {
			signOptions: { expiresIn: '24h' },
			secret: this.configService.get('JWT_SERCRET'),
		};
	}
}