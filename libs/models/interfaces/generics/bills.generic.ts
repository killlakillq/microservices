
import { AccountBalanceDto, Balance } from 'entities/dtos/account/account-balance.dto';
import { AddPersonalAccountDto } from 'entities/dtos/account/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from 'entities/dtos/account/add-phone-number-to-account.dto';
import { AddInternetClientDto } from 'entities/dtos/internet/add-internet-client.dto';
import { InternetBalanceDto } from 'entities/dtos/internet/internet-balance.dto';
import { AddMobileClientDto } from 'entities/dtos/mobile/add-mobile-client.dto';
import { MobileBalanceDto } from 'entities/dtos/mobile/mobile-balance.dto';
import { AddTaxDto } from 'entities/dtos/utilities/add-tax.dto';
import { UtilitiesTaxesDto } from 'entities/dtos/utilities/utilities-taxes.dto';
import { InternetEntity } from 'entities/internet.entity';
import { MobileEntity } from 'entities/mobile.entity';
import { UtilitiesEntity } from 'entities/utilities.entity';
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
