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
