import { User } from '../../user.interface';

export class CreateUserResponseDto {
	message: string;
	data: {
		user: User;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
