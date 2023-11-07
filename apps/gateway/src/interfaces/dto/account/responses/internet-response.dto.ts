import { Internet } from '../../../internet.interface'

export interface InternetResponseDto {
	message: string;
	data: { internet: Internet };
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
