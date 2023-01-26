import { InternetEntity } from "./entities/internet.entity";

export interface Internet {
	getInternetBalance: (personalAccount: number) => Promise<InternetEntity>;
	internetPay: (personalAccount: number, sum: number) => Promise<InternetEntity>;
}