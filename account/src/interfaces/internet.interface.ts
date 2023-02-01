import { AddInternetClientDto } from './dto/add-internet-client.dto';
import { InternetBalanceDto } from './dto/internet-balance.dto';
import { InternetEntity } from './entities/internet.entity';

export interface Internet {
	addInternetClient: (dto: AddInternetClientDto) => Promise<AddInternetClientDto>;
	checkInternetBalance: (personalAccount: number) => Promise<InternetEntity>;
	internetPay: (dto: InternetBalanceDto) => Promise<{ balance: number }>;
}
