import { AddPersonalAccountDto } from '../../interfaces/dto/account/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from '../../interfaces/dto/account/add-phone-number-to-account.dto';
import { AddInternetClientDto } from '../../interfaces/dto/internet/add-internet-client.dto';
import { InternetBalanceDto } from '../../interfaces/dto/internet/internet-balance.dto';
import { AddMobileClientDto } from '../../interfaces/dto/mobile/add-mobile-client.dto';
import { MobileBalanceDto } from '../../interfaces/dto/mobile/mobile-balance.dto';
import { AddTaxDto } from '../../interfaces/dto/utilities/add-tax.dto';
import { UtilitiesTaxesDto } from '../../interfaces/dto/utilities/utilities-taxes.dto';
import { InternetEntity } from '../../interfaces/entities/internet.entity';
import { MobileEntity } from '../../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from '../../interfaces/entities/utilities.entity';
import { UtilitiesType } from '../../interfaces/enums/utilities-type.enum';

export type Balance = {
	balance: number;
};

export type UtilitiesBills = { personalAccount: number; type: UtilitiesType; message: string };

export abstract class Payments<
	T extends AddInternetClientDto | AddMobileClientDto | AddTaxDto,
	Y extends InternetEntity | MobileEntity | UtilitiesEntity,
	L extends InternetBalanceDto | MobileBalanceDto | UtilitiesTaxesDto,
	H extends AddPersonalAccountDto | AddPhoneNumberToAccountDto,
	K extends number | string,
	O extends number | Balance | UtilitiesBills,
> {
	abstract addClient(dto: T): Promise<T>;
	abstract checkBalance(data: K, type?: UtilitiesType): Promise<Y>;
	abstract payForBills(dto: L): Promise<O>;
	abstract findAccount(dto: H): Promise<Y>;
}
