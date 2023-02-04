import { User } from '../user.interface';

export interface ServiceAuthenticationResponse {
	status: number;
	message: string;
	user: User | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
