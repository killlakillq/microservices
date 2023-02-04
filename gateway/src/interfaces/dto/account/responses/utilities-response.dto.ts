import { Utilities } from '../../../utilities.interface';

export interface UtilitiesResponseDto {
	message: string;
	data: { utilities: Utilities };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
