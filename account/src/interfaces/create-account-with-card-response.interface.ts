import {IAccountWithCard } from "./account.interface";


export interface ICreateAccountWithCardResponse {
	status: number;
	message: string;
	account: IAccountWithCard | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
