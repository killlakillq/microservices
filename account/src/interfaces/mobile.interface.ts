import { AddMobileClientDto } from "./dto/add-mobile-client.dto";
import { MobileBalanceDto } from "./dto/mobile-balance.dto";
import { MobileEntity } from "./entities/mobile.entity";

export interface Mobile {
	addMobileClient: (dto: AddMobileClientDto) => Promise<AddMobileClientDto>;
	checkMobileBalance: (phoneNumber: number) => Promise<MobileEntity>;
	replenishMobileAccount: ({ phoneNumber, sum }: MobileBalanceDto) => Promise<{ balance: number }>;
}