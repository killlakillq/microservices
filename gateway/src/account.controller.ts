import { Body, Controller, HttpStatus, Inject, Post, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AddInternetClientDto } from './interfaces/dto/account/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/account/add-mobile-client.dto';
import { AddTaxDto } from './interfaces/dto/account/add-utilities-tax.dto';
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
import { Authorization } from './decorators/auth.decorator';

@Controller('account')
export class AccountController {
	constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Authorization(true)
	@Post('addinternetclient')
	public async addInternetClient(@Body() addInternetClientDto: AddInternetClientDto): Promise<InternetResponseDto> {
		const addInternetClientResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('new-internet-client', addInternetClientDto),
		);
		if (addInternetClientResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: addInternetClientResponse.message,
					data: null,
					errors: addInternetClientResponse.errors,
				},
				addInternetClientResponse.status,
			);
		}
		return {
			message: addInternetClientResponse.message,
			data: {
				internet: addInternetClientResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('addmobileclient')
	public async addMobileClient(@Body() addMobileClientDto: AddMobileClientDto): Promise<MobileResponseDto> {
		const addMobileClientResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('new-mobile-client', addMobileClientDto),
		);
		if (addMobileClientResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: addMobileClientResponse.message,
					data: null,
					errors: addMobileClientResponse.errors,
				},
				addMobileClientResponse.status,
			);
		}
		return {
			message: addMobileClientResponse.message,
			data: {
				mobile: addMobileClientResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('addtax')
	public async addTax(@Body() addTaxDto: AddTaxDto): Promise<UtilitiesResponseDto> {
		const addUtilitiesTaxResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('new-utilities-tax', addTaxDto),
		);
		if (addUtilitiesTaxResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: addUtilitiesTaxResponse.message,
					data: null,
					errors: addUtilitiesTaxResponse.errors,
				},
				addUtilitiesTaxResponse.status,
			);
		}
		return {
			message: addUtilitiesTaxResponse.message,
			data: {
				utilities: addUtilitiesTaxResponse.data,
			},
			errors: null,
		};
	}

	@Post('checkaccountbalance')
	public async checkAccountBalance(@Body() name: string, @Body() surname: string): Promise<AccountResponseDto> {
		const checkAccountBalanceResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('check-balance', { name: name, surname: surname }),
		);
		if (checkAccountBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: checkAccountBalanceResponse.message,
					data: null,
					errors: checkAccountBalanceResponse.errors,
				},
				checkAccountBalanceResponse.status,
			);
		}
		return {
			message: checkAccountBalanceResponse.message,
			data: {
				account: checkAccountBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('balancereplenishment')
	public async balanceReplenishment(
		@Body() incrementAccountBalanceDto: AccountBalanceDto,
	): Promise<AccountResponseDto> {
		const balanceReplenishmentResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('balance-replenishment', incrementAccountBalanceDto),
		);
		if (balanceReplenishmentResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: balanceReplenishmentResponse.message,
					data: null,
					errors: balanceReplenishmentResponse.errors,
				},
				balanceReplenishmentResponse.status,
			);
		}
		return {
			message: balanceReplenishmentResponse.message,
			data: {
				account: balanceReplenishmentResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('addinternetpersonalaccount')
	public async addInternetPersonalAccount(
		@Body() addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<InternetResponseDto> {
		const balanceReplenishmentResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('add-internet-personal-account', addPersonalAccountDto),
		);
		if (balanceReplenishmentResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: balanceReplenishmentResponse.message,
					data: null,
					erros: balanceReplenishmentResponse.errors,
				},
				balanceReplenishmentResponse.status,
			);
		}
		return {
			message: balanceReplenishmentResponse.message,
			data: {
				internet: balanceReplenishmentResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('addphonenumber')
	public async addPhoneNumber(
		@Body() addPhoneNumberToAccountDto: AddPhoneNumberToAccountDto,
	): Promise<MobileResponseDto> {
		const addPhoneNumberResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('add-phone-number', addPhoneNumberToAccountDto),
		);
		if (addPhoneNumberResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: addPhoneNumberResponse.message,
					data: null,
					errors: addPhoneNumberResponse.errors,
				},
				addPhoneNumberResponse.status,
			);
		}
		return {
			message: addPhoneNumberResponse.message,
			data: {
				mobile: addPhoneNumberResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('addutilitiespersonalaccount')
	public async addUtilitiesPersonalAccount(
		@Body() addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<UtilitiesResponseDto> {
		const addUtilitiesPersonalAccountResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('add-utilities-personal-account', addPersonalAccountDto),
		);
		if (addUtilitiesPersonalAccountResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: addUtilitiesPersonalAccountResponse.message,
					data: null,
					errors: addUtilitiesPersonalAccountResponse.errors,
				},
				addUtilitiesPersonalAccountResponse.status,
			);
		}
		return {
			message: addUtilitiesPersonalAccountResponse.message,
			data: {
				utilities: addUtilitiesPersonalAccountResponse.data,
			},
			errors: null,
		};
	}

	@Post('checkinternetbalance')
	public async checkInternetBalance(@Body() personalAccount: number): Promise<InternetResponseDto> {
		const checkInternetBalanceResponse: ServiceInternetResponse = await firstValueFrom(
			this.accountClient.send('check-internet-balance', personalAccount),
		);
		if (checkInternetBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: checkInternetBalanceResponse.message,
					data: null,
					errors: checkInternetBalanceResponse.errors,
				},
				checkInternetBalanceResponse.status,
			);
		}
		return {
			message: checkInternetBalanceResponse.message,
			data: {
				internet: checkInternetBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
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
			throw new HttpException(
				{
					message: payForInternetResponse.message,
					data: null,
					errors: payForInternetResponse.errors,
				},
				payForInternetResponse.status,
			);
		}
		return {
			message: payForInternetResponse.message,
			data: {
				internet: payForInternetResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('checkmobilebalance')
	public async checkMobileBalance(@Body() phoneNumber: string): Promise<MobileResponseDto> {
		const checkMobileBalanceResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('check-mobile-balance', phoneNumber),
		);
		if (checkMobileBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: checkMobileBalanceResponse.message,
					data: null,
					errors: checkMobileBalanceResponse.errors,
				},
				checkMobileBalanceResponse.status,
			);
		}
		return {
			message: checkMobileBalanceResponse.message,
			data: {
				mobile: checkMobileBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
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
			throw new HttpException(
				{
					message: replenishMobileAccount.message,
					data: null,
					errors: replenishMobileAccount.errors,
				},
				replenishMobileAccount.status,
			);
		}
		return {
			message: replenishMobileAccount.message,
			data: {
				mobile: replenishMobileAccount.data,
			},
			errors: null,
		};
	}

	@Post('checkutilitiestaxes')
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
			throw new HttpException(
				{
					message: checkUtilitiesTaxesResponse.message,
					data: null,
					errors: checkUtilitiesTaxesResponse.errors,
				},
				checkUtilitiesTaxesResponse.status,
			);
		}
		return {
			message: checkUtilitiesTaxesResponse.message,
			data: {
				utilities: checkUtilitiesTaxesResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
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
			throw new HttpException(
				{
					message: payForUtilitiesResponse.message,
					data: null,
					errors: payForUtilitiesResponse.errors,
				},
				payForUtilitiesResponse.status,
			);
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
