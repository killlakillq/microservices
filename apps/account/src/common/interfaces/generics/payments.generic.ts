import { Balance } from '../../../modules/account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../../modules/account/entities/dtos/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from '../../../modules/account/entities/dtos/add-phone-number-to-account.dto';
import { AddInternetClientDto } from '../../../modules/internet/entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../../../modules/internet/entities/dtos/internet-balance.dto';
import { AddMobileClientDto } from '../../../modules/mobile/entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../../../modules/mobile/entities/dtos/mobile-balance.dto';
import { AddTaxDto } from '../../../modules/utilities/entities/dtos/add-tax.dto';
import { UtilitiesBills, UtilitiesTaxesDto } from '../../../modules/utilities/entities/dtos/utilities-taxes.dto';
import { InternetEntity } from '../../../modules/internet/entities/internet.entity';
import { MobileEntity } from '../../../modules/mobile/entities/mobile.entity';
import { UtilitiesEntity } from '../../../modules/utilities/entities/utilities.entity';
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
