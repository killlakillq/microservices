import { config } from 'dotenv';

config({ path: process.cwd() + '/.env' });

export class Config {
	public get(key: string) {
		return process.env[key];
	}
}
