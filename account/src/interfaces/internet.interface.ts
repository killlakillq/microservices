import { InternetEntity } from "./entities/internet.entity";

export interface Internet {
	checkInternetBalance: (personalAccount: number) => Promise<InternetEntity>;
	internetPay: (sum: number) => Promise<InternetEntity>;
}