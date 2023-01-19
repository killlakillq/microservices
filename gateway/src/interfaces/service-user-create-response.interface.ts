import { IUser } from './user.interface';

export interface IServiceUserCreateResponse {
	status: number;
	message: string;
	user: IUser | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
