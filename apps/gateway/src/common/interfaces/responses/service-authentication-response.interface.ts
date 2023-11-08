import { Token } from '../token.interface';

export interface ServiceAuthenticationResponse {
	status: number;
	message: string;
	data: Token | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
