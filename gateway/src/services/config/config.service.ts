import { Transport } from '@nestjs/microservices';

export class ConfigService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			port: process.env.PORT,
		};
		this.envConfig.authService = {
			options: {
				host: process.env.AUTH_SERVICE_HOST,
				port: process.env.AUTH_SERVICE_PORT,
			},
			transport: Transport.TCP,
		};
		this.envConfig.accountService = {
			options: {
				host: process.env.ACCOUNT_SERVICE_HOST,
				port: process.env.ACCOUNT_SERVICE_PORT
			},
			transport: Transport.TCP,
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(key: string): any {
		return this.envConfig[key];
	}
}
