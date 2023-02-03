import { AddInternetClientDto } from './dto/internet/add-internet-client.dto';
import { AddPersonalAccountDto } from './dto/account/add-personal-account.dto';
import { InternetBalanceDto } from './dto/internet/internet-balance.dto';
import { InternetEntity } from './entities/internet.entity';

export interface Internet {
	addInternetClient: (dto: AddInternetClientDto) => Promise<AddInternetClientDto>;
	checkInternetBalance: (personalAccount: number) => Promise<InternetEntity>;
	internetPay: (dto: InternetBalanceDto) => Promise<{ balance: number }>;
	findPersonalAccount: ({ name, surname, personalAccount }: AddPersonalAccountDto) => Promise<InternetEntity>;
}
