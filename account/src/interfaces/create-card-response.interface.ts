import { ICard } from "./account.interface";

export interface ICreateCardResponse {
	status: number;
	message: string;
	account: ICard | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}