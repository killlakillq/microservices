import { Account } from "../../account.interface";

export class CreateAccountResponseDto {
	message: string;
	data: {
		account: Account,
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any } 
}