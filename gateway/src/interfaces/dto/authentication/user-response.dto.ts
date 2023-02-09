import { Token } from '../../token.interface';

export class UserResponseDto {
	message: string;
	data: {
		tokens: Token;
	} | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
