import { Internet } from '../internet.interface';

export interface ServiceInternetResponse {
	status: number;
	message: string;
	internet: Internet | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
