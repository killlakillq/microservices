import { MobileEntity } from "./entities/mobile.entity";

export interface Mobile {
	checkMobileBalance: (phoneNumber: number) => Promise<MobileEntity>;
	topUpTheAccount: (sum: number) => Promise<MobileEntity>;
}