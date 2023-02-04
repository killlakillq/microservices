import { Mobile } from '../mobile.interface';

export interface ServiceMobileResponse {
	status: number;
	message: string;
	mobile: Mobile | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
