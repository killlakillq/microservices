import { AccountBalanceDto, Balance } from '../../../account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../../account/entities/dtos/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from '../../../account/entities/dtos/add-phone-number-to-account.dto';
import { AddInternetClientDto } from '../../../internet/entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../../../internet/entities/dtos/internet-balance.dto';
import { InternetEntity } from '../../../internet/entities/internet.entity';
import { AddMobileClientDto } from '../../../mobile/entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../../../mobile/entities/dtos/mobile-balance.dto';
import { MobileEntity } from '../../../mobile/entities/mobile.entity';
import { AddTaxDto } from '../../../utilities/entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto } from '../../../utilities/entities/dtos/utilities-taxes.dto';
import { UtilitiesEntity } from '../../../utilities/entities/utilities.entity';
import { UtilitiesType } from '../enums/utilities-type.enum';

export type InternetAccount = { name: string; surname: string; internet: number };
export type MobileAccount = { name: string; surname: string; mobile: string; operator: string };
export type UtilitiesAccount = { name: string; surname: string; utilities: number };
export type UtilitiesPaid = { personalAccount: number; type: UtilitiesType; message: string };

type CreateDtos = AddInternetClientDto | AddMobileClientDto | AddTaxDto;
type Entities = InternetEntity | MobileEntity | UtilitiesEntity;
type CreateAccountDtos = AddPersonalAccountDto | AddPhoneNumberToAccountDto;
type FunctionValuesTypes = number | string;
export type BalanceDtos = AccountBalanceDto | InternetBalanceDto | MobileBalanceDto | UtilitiesTaxesDto;
export type ReturnTypes = InternetAccount | MobileAccount | UtilitiesAccount | Balance | UtilitiesPaid;

export abstract class Bills<
	T extends CreateDtos,
	Y extends Entities,
	L extends BalanceDtos,
	H extends CreateAccountDtos,
	K extends FunctionValuesTypes,
	O extends ReturnTypes,
> {
	abstract addClient(dto: T): Promise<T>;
	abstract addAccount(dto: H): Promise<O>;
	abstract checkBalance(account: K, type?: UtilitiesType): Promise<Y>;
	abstract payForBills(increment: L, decrement: L): Promise<O>;
}
