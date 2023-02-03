import { Account } from './account.interface';

export interface ServiceAccountCreateResponse {
	status: number;
	message: string;
	account: Account | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
