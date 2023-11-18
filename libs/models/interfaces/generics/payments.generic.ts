import { Balance } from 'entities/dtos/account/account-balance.dto';
import { AddPersonalAccountDto } from 'entities/dtos/account/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from 'entities/dtos/account/add-phone-number-to-account.dto';
import { AddInternetClientDto } from 'entities/dtos/internet/add-internet-client.dto';
import { InternetBalanceDto } from 'entities/dtos/internet/internet-balance.dto';
import { AddMobileClientDto } from 'entities/dtos/mobile/add-mobile-client.dto';
import { MobileBalanceDto } from 'entities/dtos/mobile/mobile-balance.dto';
import { AddTaxDto } from 'entities/dtos/utilities/add-tax.dto';
import { UtilitiesTaxesDto, UtilitiesBills } from 'entities/dtos/utilities/utilities-taxes.dto';
import { InternetEntity } from 'entities/internet.entity';
import { MobileEntity } from 'entities/mobile.entity';
import { UtilitiesEntity } from 'entities/utilities.entity';
import { UtilitiesType } from '../enums/utilities-type.enum';

type CreateDtos = AddInternetClientDto | AddMobileClientDto | AddTaxDto;
type Entities = InternetEntity | MobileEntity | UtilitiesEntity;
type BalanceDtos = InternetBalanceDto | MobileBalanceDto | UtilitiesTaxesDto;
type CreateAccountDtos = AddPersonalAccountDto | AddPhoneNumberToAccountDto;
type ReturnTypes = number | Balance | UtilitiesBills;
type FunctionValuesTypes = number | string;

export abstract class Payments<
	T extends CreateDtos,
	Y extends Entities,
	L extends BalanceDtos,
	H extends CreateAccountDtos,
	K extends FunctionValuesTypes,
	O extends ReturnTypes,
> {
	abstract addClient(dto: T): Promise<T>;
	abstract checkBalance(data: K, type?: UtilitiesType): Promise<Y>;
	abstract payForBills(dto: L): Promise<O>;
	abstract findAccount(dto: H): Promise<Y>;
}
