import { AddMobileClientDto } from './dto/add-mobile-client.dto';
import { AddPhoneNumberToAccountDto } from './dto/add-phone-number-to-account.dto';
import { MobileBalanceDto } from './dto/mobile-balance.dto';
import { MobileEntity } from './entities/mobile.entity';

export interface Mobile {
	addMobileClient: (dto: AddMobileClientDto) => Promise<AddMobileClientDto>;
	checkMobileBalance: (phoneNumber: string) => Promise<MobileEntity>;
	replenishMobileAccount: ({ phoneNumber, sum }: MobileBalanceDto) => Promise<{ balance: number }>;
	findPhoneNumber: ({
		name,
		surname,
		phoneNumber,
		operator,
	}: AddPhoneNumberToAccountDto) => Promise<MobileEntity>;
}
