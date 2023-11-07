import { Account } from '../../../account.interface';

export interface AccountResponseDto {
	message: string;
	data: { account: Account };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
