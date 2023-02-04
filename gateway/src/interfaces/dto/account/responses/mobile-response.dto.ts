import { Mobile } from '../../../mobile.interface';

export interface MobileResponseDto {
	message: string;
	data: { mobile: Mobile };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
