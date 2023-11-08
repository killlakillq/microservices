import { AccountBalanceDto, Balance } from '../../../modules/account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../../modules/account/entities/dtos/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from '../../../modules/account/entities/dtos/add-phone-number-to-account.dto';
import { AddInternetClientDto } from '../../../modules/internet/entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../../../modules/internet/entities/dtos/internet-balance.dto';
import { AddMobileClientDto } from '../../../modules/mobile/entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../../../modules/mobile/entities/dtos/mobile-balance.dto';
import { AddTaxDto } from '../../../modules/utilities/entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto } from '../../../modules/utilities/entities/dtos/utilities-taxes.dto';
import { InternetEntity } from '../../../modules/internet/entities/internet.entity';
import { MobileEntity } from '../../../modules/mobile/entities/mobile.entity';
import { UtilitiesEntity } from '../../../modules/utilities/entities/utilities.entity';
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
