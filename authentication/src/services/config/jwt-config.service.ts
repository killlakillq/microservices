import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
	createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
		return {
			secret: 'asdasdasd',
		};
	}
}