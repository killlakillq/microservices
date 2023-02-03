import { User } from './user.interface';

export interface ServiceUserLoginResponse {
	status: number;
	message: string;
	user: User | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
