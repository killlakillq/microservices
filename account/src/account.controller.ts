import { Body, Controller, Post } from '@nestjs/common';
import { AccountResponse } from './interfaces/account-reponse.interface';
import { AddInternetClientDto } from './interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from './interfaces/dto/add-tax.dto';
import { CreateAccountDto } from './interfaces/dto/create-account.dto';
import { UtilitiesType } from './interfaces/enums/utilities-type.enum';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('create')
	public async createAccount(@Body() dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountService.createAccount({ ...dto });
	}

	@Post('newInternetClient')
	public async addInternetClient(@Body() dto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.accountService.addInternetClient(dto);
	}

	@Post('newMobileClient')
	public async addMobileClient(@Body() dto: AddMobileClientDto) {
		return await this.accountService.addMobileClient(dto);
	}

	@Post('newUtilitiesTax')
	public async addTax(@Body() dto: AddTaxDto) {
		return await this.accountService.addTax(dto);
	}

	@Post('replenishBalance')
	public async balanceReplenishment(@Body() sum: number): Promise<AccountResponse> {
		try {
			const balance = await this.accountService.balanceReplenishment(sum);
			console.log(balance);
			
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

	public async payForInternet(sum: number): Promise<AccountResponse> {
		try {
			const internetAccount = await this.accountService.payForInternet(sum);
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
