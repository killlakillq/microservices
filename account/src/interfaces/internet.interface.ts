import { AddInternetClientDto } from "./dto/add-internet-client.dto";
import { PayForInternetDto } from "./dto/pay-for-internet.dto";
import { InternetEntity } from "./entities/internet.entity";

export interface Internet {
	addInternetClient: (dto: AddInternetClientDto) => Promise<AddInternetClientDto>;
	checkInternetBalance: (personalAccount: number) => Promise<InternetEntity>;
	internetPay: (dto: PayForInternetDto) => Promise<InternetEntity[]>;
}