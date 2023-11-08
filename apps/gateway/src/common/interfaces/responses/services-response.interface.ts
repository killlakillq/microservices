import { Account } from '../account.interface';
import { Internet } from '../internet.interface';
import { Mobile } from '../mobile.interface';
import { Token } from '../token.interface';
import { Utilities } from '../utilities.interface';

type Services = Utilities | Mobile | Internet | Token | Account;

export interface ServicesResponse<T extends Services> {
	status: number;
	message: string;
	data: T | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
