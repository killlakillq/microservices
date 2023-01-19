import { IUser } from "../user.interface";

export interface LoginUserResponseDto {
	message: string;
	data: {
		user: IUser;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
