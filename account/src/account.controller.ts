import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountResponse } from './interfaces/account-reponse.interface';
import { AccountBalanceDto } from './interfaces/dto/account-balance.dto';
import { AddInternetClientDto } from './interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from './interfaces/dto/add-tax.dto';
import { CreateAccountDto } from './interfaces/dto/create-account.dto';
import { InternetBalanceDto } from './interfaces/dto/internet-balance.dto';
import { MobileBalanceDto } from './interfaces/dto/mobile-balance.dto';
import { UtilitiesTaxesDto } from './interfaces/dto/utilities-taxes.dto';
import { UtilitiesType } from './interfaces/enums/utilities-type.enum';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@MessagePattern('create-account')
	public async createAccount(dto: CreateAccountDto): Promise<AccountResponse> {
		try {
			const create = this.accountService.createAccount(dto);
			return {
				status: 202,
				message: 'the account was successfully created.',
				data: create,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('new-internet-client')
	public async addInternetClient(dto: AddInternetClientDto): Promise<AccountResponse> {
		try {
			const create = this.accountService.addInternetClient(dto);
			return {
				status: 202,
				message: 'the client was successfully created.',
				data: create,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('new-mobile-client')
	public async addMobileClient(dto: AddMobileClientDto): Promise<AccountResponse> {
		try {
			const create = await this.accountService.addMobileClient(dto);
			return {
				status: 202,
				message: 'the client was successfully created.',
				data: create,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('new-utilities-tax')
	public async addTax(dto: AddTaxDto): Promise<AccountResponse> {
		try {
			const create = await this.accountService.addTax(dto);
			return {
				status: 202,
				message: 'the tax was successfully added.',
				data: create,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('check-balance')
	public async checkBalance(name: string, surname: string): Promise<AccountResponse> {
		try {
			const check = await this.accountService.checkBalance(name, surname);
			return {
				status: 202,
				message: 'the tax was successfully added.',
				data: check,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('balance-replenishment')
	public async balanceReplenishment(incrementAccountBalanceDto: AccountBalanceDto): Promise<AccountResponse> {
		try {
			const balance = await this.accountService.balanceReplenishment(incrementAccountBalanceDto);
			return {
				status: 202,
				message: 'the account balance was successfully replenished.',
				data: balance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('check-internet-balance')
	public async checkInternetBalance(personalAccount: number): Promise<AccountResponse> {
		try {
			const checkBalance = await this.accountService.checkInternetBalance(personalAccount);
			return {
				status: 202,
				message: `your internet balance is ${checkBalance.balance}.`,
				data: checkBalance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('pay-for-internet')
	public async payForInternet(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: InternetBalanceDto,
	): Promise<AccountResponse> {
		try {
			const internetAccount = await this.accountService.payForInternet(
				decrementAccountBalanceDto,
				incrementInternetBalanceDto,
			);
			return {
				status: 202,
				message: 'the internet balance was successfully paid.',
				data: internetAccount,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('check-mobile-balance')
	public async checkMobileBalance(phoneNumber: number): Promise<AccountResponse> {
		try {
			const checkBalance = await this.accountService.checkMobileBalance(phoneNumber);
			return {
				status: 202,
				message: `your mobile balance is ${checkBalance.balance}.`,
				data: checkBalance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('replenish-mobile-account')
	public async replenishMobileAccount(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: MobileBalanceDto,
	): Promise<AccountResponse> {
		try {
			const mobileAccount = await this.accountService.replenishMobileAccount(
				decrementAccountBalanceDto,
				incrementInternetBalanceDto,
			);
			return {
				status: 202,
				message: `the mobile balance was successfully replenished.`,
				data: mobileAccount,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('check-utilities-taxes')
	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<AccountResponse> {
		try {
			const taxes = await this.accountService.checkUtilitiesTaxes(personalAccount, type);
			if (!taxes) {
				return {
					status: 404,
					message: `you haven't taxes for utilities.`,
					data: null,
					errors: null,
				};
			}
			return {
				status: 202,
				message: `you have a taxes for utilities.`,
				data: taxes,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@MessagePattern('pay-for-utilities')
	public async payForUtilities(
		decrementAccountBalanceDto: AccountBalanceDto,
		payForTaxes: UtilitiesTaxesDto,
	): Promise<AccountResponse> {
		try {
			const billing = await this.accountService.payForUtilities(decrementAccountBalanceDto, payForTaxes);
			return {
				status: 202,
				message: `your taxes was successfully paid.`,
				data: billing,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}
}
