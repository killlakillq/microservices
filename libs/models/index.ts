// Account
export { Account } from './interfaces/account.interface';
export { CreateAccountDto } from './entities/dtos/account/create-account.dto';
export { Balance, AccountBalanceDto } from './entities//dtos/account/account-balance.dto';
export { AddPersonalAccountDto } from './entities//dtos/account/add-personal-account.dto';
export { AddPhoneNumberToAccountDto } from './entities/dtos/account/add-phone-number-to-account.dto';
export { AccountEntity } from './entities/account.entity';

// Mobile
export { Mobile } from './interfaces/mobile.interface';
export { AddMobileClientDto } from './entities/dtos/mobile/add-mobile-client.dto';
export { MobileBalanceDto } from './entities/dtos/mobile/mobile-balance.dto';
export { MobileEntity } from './entities/mobile.entity';

// Internet
export { Internet } from './interfaces/internet.interface';
export { AddInternetClientDto } from './entities/dtos/internet/add-internet-client.dto';
export { InternetBalanceDto } from './entities/dtos/internet/internet-balance.dto';
export { InternetEntity } from './entities/internet.entity';

// Utilities
export { Utilities } from './interfaces/utilities.interface';
export { AddTaxDto } from './entities/dtos/utilities/add-tax.dto';
export { UtilitiesTaxesDto } from './entities/dtos/utilities/utilities-taxes.dto';
export { UtilitiesEntity } from './entities/utilities.entity';

// Auth
export { CreateUserDto } from './entities/dtos/auth/create-user.dto';
export { RegisterUserDto } from './entities/dtos/auth/register-user.dto';
export { LoginUserDto } from './entities/dtos/auth/login-user.dto';
export { Tokens } from './interfaces/token.interface';
export { User, UserPayload } from './interfaces/user.interface';
export { UserEntity } from './entities/user.entity';

// Enums
export { UtilitiesType } from './interfaces/enums/utilities-type.enum';

// Generics
export {
	Bills,
	InternetAccount,
	MobileAccount,
	UtilitiesAccount,
	UtilitiesPaid,
	ReturnTypes,
	BalanceDtos,
} from './interfaces/generics/bills.generic';
export { Payments } from './interfaces/generics/payments.generic';

// Responses
export { ServicesResponse } from './interfaces/responses/services-response.interface';
