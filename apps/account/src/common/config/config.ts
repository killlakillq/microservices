export class ConfigService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private readonly envConfig: { [key: string]: any } = null;

	constructor() {
		this.envConfig = {
			HOST: process.env.ACCOUNT_SERVICE_HOST,
			PORT: process.env.ACCOUNT_SERVICE_PORT,
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(key: string): any {
		return this.envConfig[key];
	}
}
