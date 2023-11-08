import { Balance } from '../../../account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../../account/entities/dtos/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from '../../../account/entities/dtos/add-phone-number-to-account.dto';
import { AddInternetClientDto } from '../../../internet/entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../../../internet/entities/dtos/internet-balance.dto';
import { InternetEntity } from '../../../internet/entities/internet.entity';
import { AddMobileClientDto } from '../../../mobile/entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../../../mobile/entities/dtos/mobile-balance.dto';
import { MobileEntity } from '../../../mobile/entities/mobile.entity';
import { AddTaxDto } from '../../../utilities/entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto, UtilitiesBills } from '../../../utilities/entities/dtos/utilities-taxes.dto';
import { UtilitiesEntity } from '../../../utilities/entities/utilities.entity';
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
