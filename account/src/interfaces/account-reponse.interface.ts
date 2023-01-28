import { AccountEntity } from "./entities/account.entity";
import { InternetEntity } from "./entities/internet.entity";
import { MobileEntity } from "./entities/mobile.entity";
import { UtilitiesEntity } from "./entities/utilities.entity";

export interface AccountResponse {
	status: number;
	message: string;
	data: AccountEntity | InternetEntity | MobileEntity | UtilitiesEntity | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any } | null;
}