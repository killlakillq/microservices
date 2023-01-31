import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountResponse } from './interfaces/account-reponse.interface';
import { AddInternetClientDto } from './interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from './interfaces/dto/add-tax.dto';
import { CreateAccountDto } from './interfaces/dto/create-account.dto';
import { PayForInternetDto } from './interfaces/dto/pay-for-internet.dto';
import { IncrementOrDecrementAccountBalanceDto } from './interfaces/dto/increment-decrement-account-balance.dto';
import { UtilitiesType } from './interfaces/enums/utilities-type.enum';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	// @MessagePattern('create-account')
	@Post('/create')
	public async createAccount(@Body() dto: CreateAccountDto) {
		return await this.accountService.createAccount({ ...dto });
	}

	// @MessagePattern('new-internet-client')
	@Post('/add')
	public async addInternetClient(@Body() dto: AddInternetClientDto) {
		return await this.accountService.addInternetClient(dto);
	}

	@MessagePattern('new-mobile-client')
	public async addMobileClient(dto: AddMobileClientDto) {
		return await this.accountService.addMobileClient(dto);
	}

	@MessagePattern('new-utilities-tax')
	public async addTax(dto: AddTaxDto) {
		return await this.accountService.addTax(dto);
	}

	@MessagePattern('check-balance')
	public async checkBalance(name: string, surname: string) {
		return await this.accountService.checkBalance(name, surname);
	}

	// @MessagePattern('balance-replenishment')
	@Post('/replenish')
	public async balanceReplenishment(
		@Body() incrementAccountBalanceDto: IncrementOrDecrementAccountBalanceDto,
	): Promise<AccountResponse> {
		try {
			const balance = await this.accountService.balanceReplenishment(incrementAccountBalanceDto);
			return {
				status: 202,
				message: 'the account balance was successfully replenished',
				data: balance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	public async checkInternetBalance(personalAccount: number): Promise<AccountResponse> {
		try {
			const checkBalance = await this.accountService.checkInternetBalance(personalAccount);
			return {
				status: 202,
				message: `your internet balance is ${checkBalance.balance}`,
				data: checkBalance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	@Post('/internetpay')
	public async payForInternet(
		@Body() decrementAccountBalanceDto: IncrementOrDecrementAccountBalanceDto,
		@Body() incrementInternetBalanceDto: PayForInternetDto,
	): Promise<AccountResponse> {
		try {
			const internetAccount = await this.accountService.payForInternet(
				decrementAccountBalanceDto,
				incrementInternetBalanceDto,
			);
			console.log(internetAccount);
			return {
				status: 202,
				message: 'the internet balance was successfully paid',
				data: internetAccount,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	public async checkMobileBalance(phoneNumber: number): Promise<AccountResponse> {
		try {
			const checkBalance = await this.accountService.checkMobileBalance(phoneNumber);
			return {
				status: 202,
				message: `your mobile balance is ${checkBalance.balance}`,
				data: checkBalance,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	public async mobileAccountTopUp(sum: number): Promise<AccountResponse> {
		try {
			const mobileAccount = await this.accountService.mobileAccountTopUp(sum);
			return {
				status: 202,
				message: `the mobile balance was successfully replenished`,
				data: mobileAccount,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<AccountResponse> {
		try {
			const taxes = await this.accountService.checkUtilitiesTaxes(personalAccount, type);
			if (!taxes) {
				return {
					status: 404,
					message: `you haven't taxes for utilities`,
					data: null,
					errors: null,
				};
			}
			return {
				status: 202,
				message: `you have a taxes for utilities`,
				data: taxes,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}

	public async payForUtilities(personalAccount: number, type: UtilitiesType, sum: number): Promise<AccountResponse> {
		try {
			const taxes = await this.checkUtilitiesTaxes(personalAccount, type);
			if (!taxes) {
				return {
					status: 404,
					message: `you haven't taxes for utilities`,
					data: null,
					errors: null,
				};
			}
			const billing = await this.accountService.payForUtilities(personalAccount, type, sum);
			return {
				status: 202,
				message: `your taxes was successfully paid`,
				data: billing,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}
}
