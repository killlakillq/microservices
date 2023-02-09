import { Account } from '../account.interface';

export interface ServiceAccountResponse {
	status: number;
	message: string;
	data: Account | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
