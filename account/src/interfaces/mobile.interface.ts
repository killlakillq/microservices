import { AddMobileClientDto } from "./dto/add-mobile-client.dto";
import { MobileEntity } from "./entities/mobile.entity";

export interface Mobile {
	addMobileClient: (dto: AddMobileClientDto) => Promise<AddMobileClientDto>;
	checkMobileBalance: (phoneNumber: number) => Promise<MobileEntity>;
	topUpTheAccount: (sum: number) => Promise<MobileEntity>;
}