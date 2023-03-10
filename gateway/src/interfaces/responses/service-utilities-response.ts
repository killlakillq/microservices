import { Utilities } from '../utilities.interface';

export interface ServiceUtilitiesResponse {
	status: number;
	message: string;
	data: Utilities | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
