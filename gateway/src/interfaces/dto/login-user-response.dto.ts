import { IUser } from "../user.interface";

export interface LoginUserResponseDto {
	message: string;
	data: {
		user: IUser;
	};
	errors: { [key: string]: any };
}
