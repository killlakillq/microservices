import { Transport } from '@nestjs/microservices';

export class ConfigService {
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			port: process.env.PORT,
		};
		this.envConfig.authService = {
			options: {
				port: process.env.AUTH_SERVICE_POST,
				host: process.env.AUTH_SERVICE_HOST,
			},
			transport: Transport.TCP,
		};
	}

	get(key: string): any {
		return this.envConfig[key];
	}
}
