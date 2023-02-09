import { Body, Controller, Get, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AddInternetClientDto } from './interfaces/dto/account/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/account/add-mobile-client.dto';
import { AddTaxDto } from './interfaces/dto/account/add-utilities-tax.dto';
import { CreateAccountDto } from './interfaces/dto/account/create-account.dto';
import { ServiceAccountResponse } from './interfaces/responses/service-account-response.interface';
import { ServiceInternetResponse } from './interfaces/responses/service-internet-response.interface';
import { ServiceMobileResponse } from './interfaces/responses/service-mobile-add-client-response.interface';
import { ServiceUtilitiesResponse } from './interfaces/responses/service-utilities-response';
import { AccountResponseDto } from './interfaces/dto/account/responses/account-response.dto';
import { InternetResponseDto } from './interfaces/dto/account/responses/internet-response.dto';
import { MobileResponseDto } from './interfaces/dto/account/responses/mobile-response.dto';
import { UtilitiesResponseDto } from './interfaces/dto/account/responses/utilities-response.dto';
import { UtilitiesType } from './interfaces/enums/utilities-type.enum';
import { AccountBalanceDto } from './interfaces/dto/account/account-balance.dto';
import { AddPersonalAccountDto } from './interfaces/dto/account/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from './interfaces/dto/account/add-phone-number-to-account.dto';
import { InternetBalanceDto } from './interfaces/dto/account/internet-balance.dto';
import { MobileBalanceDto } from './interfaces/dto/account/mobile-balance.dto';
import { UtilitiesTaxesDto } from './interfaces/dto/account/utilities-taxes.dto';

@Controller('account')
export class AccountController {
	constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Post('createaccount')
	public async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
		const createAccountResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('create-account', createAccountDto),
		);
		if (createAccountResponse.status !== HttpStatus.CREATED) {
			throw new RpcException({
				status: createAccountResponse.status,
				message: createAccountResponse.message,
				data: null,
				errors: createAccountResponse.errors,
			});
		}

		return {
			message: createAccountResponse.message,
			data: {
				account: createAccountResponse.data,
			},
			errors: null,
		};
	}

	@Post('addinternetclient')
	public async addInternetClient(@Body() addInternetClientDto: AddInternetClientDto): Promise<InternetResponseDto> {
		const addInternetClientResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('new-internet-client', addInternetClientDto),
		);
		if (addInternetClientResponse.status !== HttpStatus.CREATED) {
			throw new RpcException({
				status: addInternetClientResponse.status,
				message: addInternetClientResponse.message,
				data: null,
				errors: addInternetClientResponse.errors,
			});
		}
		return {
			message: addInternetClientResponse.message,
			data: {
				internet: addInternetClientResponse.data,
			},
			errors: null,
		};
	}

	@Post('addmobileclient')
	public async addMobileClient(@Body() addMobileClientDto: AddMobileClientDto): Promise<MobileResponseDto> {
		const addMobileClientResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('new-mobile-client', addMobileClientDto),
		);
		if (addMobileClientResponse.status !== HttpStatus.CREATED) {
			throw new RpcException({
				status: addMobileClientResponse.status,
				message: addMobileClientResponse.message,
				data: null,
				errors: addMobileClientResponse.errors,
			});
		}
		return {
			message: addMobileClientResponse.message,
			data: {
				mobile: addMobileClientResponse.data,
			},
			errors: null,
		};
	}

	@Post('addtax')
	public async addTax(@Body() addTaxDto: AddTaxDto): Promise<UtilitiesResponseDto> {
		const addUtilitiesTaxResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('new-utilities-tax', addTaxDto),
		);
		if (addUtilitiesTaxResponse.status !== HttpStatus.CREATED) {
			throw new RpcException({
				status: addUtilitiesTaxResponse.status,
				message: addUtilitiesTaxResponse.message,
				data: null,
				errors: addUtilitiesTaxResponse.errors,
			});
		}
		return {
			message: addUtilitiesTaxResponse.message,
			data: {
				utilities: addUtilitiesTaxResponse.data,
			},
			errors: null,
		};
	}

	@Get('checkaccountbalance')
	public async checkAccountBalance(@Body() name: string, @Body() surname: string): Promise<AccountResponseDto> {
		const checkAccountBalanceResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('check-balance', { name: name, surname: surname }),
		);
		if (checkAccountBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: checkAccountBalanceResponse.status,
				message: checkAccountBalanceResponse.message,
				data: null,
				errors: checkAccountBalanceResponse.errors,
			});
		}
		return {
			message: checkAccountBalanceResponse.message,
			data: {
				account: checkAccountBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Post('balancereplenishment')
	public async balanceReplenishment(
		@Body() incrementAccountBalanceDto: AccountBalanceDto,
	): Promise<AccountResponseDto> {
		const balanceReplenishmentResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('balance-replenishment', incrementAccountBalanceDto),
		);
		if (balanceReplenishmentResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: balanceReplenishmentResponse.status,
				message: balanceReplenishmentResponse.message,
				data: null,
				errors: balanceReplenishmentResponse.errors,
			});
		}
		return {
			message: balanceReplenishmentResponse.message,
			data: {
				account: balanceReplenishmentResponse.data,
			},
			errors: null,
		};
	}

	@Post('addinternetpersonalaccount')
	public async addInternetPersonalAccount(
		@Body() addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<InternetResponseDto> {
		const balanceReplenishmentResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('add-internet-personal-account', addPersonalAccountDto),
		);
		if (balanceReplenishmentResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: balanceReplenishmentResponse.status,
				message: balanceReplenishmentResponse.message,
				data: null,
				erros: balanceReplenishmentResponse.errors,
			});
		}
		return {
			message: balanceReplenishmentResponse.message,
			data: {
				internet: balanceReplenishmentResponse.data,
			},
			errors: null,
		};
	}

	@Post('addphonenumber')
	public async addPhoneNumber(
		@Body() addPhoneNumberToAccountDto: AddPhoneNumberToAccountDto,
	): Promise<MobileResponseDto> {
		const addPhoneNumberResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('add-phone-number', addPhoneNumberToAccountDto),
		);
		if (addPhoneNumberResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: addPhoneNumberResponse.status,
				message: addPhoneNumberResponse.message,
				data: null,
				errors: addPhoneNumberResponse.errors,
			});
		}
		return {
			message: addPhoneNumberResponse.message,
			data: {
				mobile: addPhoneNumberResponse.data,
			},
			errors: null,
		};
	}

	@Post('addutilitiespersonalaccount')
	public async addUtilitiesPersonalAccount(
		@Body() addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<UtilitiesResponseDto> {
		const addUtilitiesPersonalAccountResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('add-utilities-personal-account', addPersonalAccountDto),
		);
		if (addUtilitiesPersonalAccountResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: addUtilitiesPersonalAccountResponse.status,
				message: addUtilitiesPersonalAccountResponse.message,
				data: null,
				errors: addUtilitiesPersonalAccountResponse.errors,
			});
		}
		return {
			message: addUtilitiesPersonalAccountResponse.message,
			data: {
				utilities: addUtilitiesPersonalAccountResponse.data,
			},
			errors: null,
		};
	}

	@Get('checkinternetbalance')
	public async checkInternetBalance(@Body() personalAccount: number): Promise<InternetResponseDto> {
		const checkInternetBalanceResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('check-internet-balance', personalAccount),
		);
		if (checkInternetBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: checkInternetBalanceResponse.status,
				message: checkInternetBalanceResponse.message,
				data: null,
				errors: checkInternetBalanceResponse.errors,
			});
		}
		return {
			message: checkInternetBalanceResponse.message,
			data: {
				internet: checkInternetBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Post('payforinternet')
	public async payForInternet(
		@Body() decrementAccountBalanceDto: AccountBalanceDto,
		@Body() incrementInternetBalanceDto: InternetBalanceDto,
	): Promise<InternetResponseDto> {
		const payForInternetResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('check-internet-balance', {
				decrementAccountBalanceDto: decrementAccountBalanceDto,
				incrementInternetBalanceDto: incrementInternetBalanceDto,
			}),
		);
		if (payForInternetResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: payForInternetResponse.status,
				message: payForInternetResponse.message,
				data: null,
				errors: payForInternetResponse.errors,
			});
		}
		return {
			message: payForInternetResponse.message,
			data: {
				internet: payForInternetResponse.data,
			},
			errors: null,
		};
	}

	@Get('checkmobilebalance')
	public async checkMobileBalance(@Body() phoneNumber: string): Promise<MobileResponseDto> {
		const checkMobileBalanceResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('check-mobile-balance', phoneNumber),
		);
		if (checkMobileBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: checkMobileBalanceResponse.status,
				message: checkMobileBalanceResponse.message,
				data: null,
				errors: checkMobileBalanceResponse.errors,
			});
		}
		return {
			message: checkMobileBalanceResponse.message,
			data: {
				mobile: checkMobileBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Post('replenishmobileaccount')
	public async replenishMobileAccount(
		@Body() decrementAccountBalanceDto: AccountBalanceDto,
		@Body() incrementInternetBalanceDto: MobileBalanceDto,
	): Promise<MobileResponseDto> {
		const replenishMobileAccount: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('replenish-mobile-account', {
				decrementAccountBalanceDto: decrementAccountBalanceDto,
				incrementInternetBalanceDto: incrementInternetBalanceDto,
			}),
		);
		if (replenishMobileAccount.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: replenishMobileAccount.status,
				message: replenishMobileAccount.message,
				data: null,
				errors: replenishMobileAccount.errors,
			});
		}
		return {
			message: replenishMobileAccount.message,
			data: {
				mobile: replenishMobileAccount.data,
			},
			errors: null,
		};
	}

	@Get('checkutilitiestaxes')
	public async checkUtilitiesTaxes(
		@Body() personalAccount: number,
		@Body() type: UtilitiesType,
	): Promise<UtilitiesResponseDto> {
		const checkUtilitiesTaxesResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('check-utilities-taxes', {
				personalAccount: personalAccount,
				type: type,
			}),
		);
		if (checkUtilitiesTaxesResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: checkUtilitiesTaxesResponse.status,
				message: checkUtilitiesTaxesResponse.message,
				data: null,
				errors: checkUtilitiesTaxesResponse.errors,
			});
		}
		return {
			message: checkUtilitiesTaxesResponse.message,
			data: {
				utilities: checkUtilitiesTaxesResponse.data,
			},
			errors: null,
		};
	}

	@Post('payforutilities')
	public async payForUtilities(
		@Body() decrementAccountBalanceDto: AccountBalanceDto,
		@Body() payForTaxes: UtilitiesTaxesDto,
	): Promise<UtilitiesResponseDto> {
		const payForUtilitiesResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('pay-for-utilities', {
				decrementAccountBalanceDto: decrementAccountBalanceDto,
				payForTaxes: payForTaxes,
			}),
		);
		if (payForUtilitiesResponse.status !== HttpStatus.ACCEPTED) {
			throw new RpcException({
				status: payForUtilitiesResponse.status,
				message: payForUtilitiesResponse.message,
				data: null,
				errors: payForUtilitiesResponse.errors,
			});
		}
		return {
			message: payForUtilitiesResponse.message,
			data: {
				utilities: payForUtilitiesResponse.data,
			},
			errors: null,
		};
	}
}
