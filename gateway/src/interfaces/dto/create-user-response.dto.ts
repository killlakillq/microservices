import { IUser } from '../user.interface';

export class CreateUserResponseDto {
	message: string;
	data: {
		user: IUser;
	};
	errors: { [key: string]: any };
}
