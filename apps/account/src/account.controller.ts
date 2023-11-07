import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountResponseDto } from './interfaces/dto/account/account-reponse.dto';
import { AccountBalanceDto } from './interfaces/dto/account/account-balance.dto';
import { AddInternetClientDto } from './interfaces/dto/internet/add-internet-client.dto';
import { AddMobileClientDto } from './interfaces/dto/mobile/add-mobile-client.dto';
import { AddPersonalAccountDto } from './interfaces/dto/account/add-personal-account.dto';
import { AddPhoneNumberToAccountDto } from './interfaces/dto/account/add-phone-number-to-account.dto';
import { AddTaxDto } from './interfaces/dto/utilities/add-tax.dto';
import { CreateAccountDto } from './interfaces/dto/account/create-account.dto';
import { InternetBalanceDto } from './interfaces/dto/internet/internet-balance.dto';
import { MobileBalanceDto } from './interfaces/dto/mobile/mobile-balance.dto';
import { UtilitiesTaxesDto } from './interfaces/dto/utilities/utilities-taxes.dto';
import { UtilitiesType } from './interfaces/enums/utilities-type.enum';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('create-account')
	public async createAccount(createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
		const create = this.accountService.createAccount(createAccountDto);
		return {
			status: 202,
			message: 'the account was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-internet-client')
	public async addInternetClient(addInternetClientDto: AddInternetClientDto): Promise<AccountResponseDto> {
		const create = this.accountService.addInternetClient(addInternetClientDto);
		return {
			status: 202,
			message: 'the client was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-mobile-client')
	public async addMobileClient(dto: AddMobileClientDto): Promise<AccountResponseDto> {
		const create = await this.accountService.addMobileClient(dto);
		return {
			status: 202,
			message: 'the client was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-utilities-tax')
	public async addTax(addTaxDto: AddTaxDto): Promise<AccountResponseDto> {
		const create = await this.accountService.addTax(addTaxDto);
		return {
			status: 202,
			message: 'the tax was successfully added.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-balance')
	public async checkAccountBalance(name: string, surname: string): Promise<AccountResponseDto> {
		const check = await this.accountService.checkAccountBalance(name, surname);
		return {
			status: 202,
			message: 'the tax was successfully added.',
			data: check,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('balance-replenishment')
	public async balanceReplenishment(incrementAccountBalanceDto: AccountBalanceDto): Promise<AccountResponseDto> {
		const balance = await this.accountService.balanceReplenishment(incrementAccountBalanceDto);
		return {
			status: 202,
			message: 'the account balance was successfully replenished.',
			data: balance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-internet-personal-account')
	public async addInternetPersonalAccount(
		addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<AccountResponseDto> {
		const internet = await this.accountService.addInternetPersonalAccount(addPersonalAccountDto);
		return {
			status: 202,
			message: 'personal account was successfully added to account.',
			data: internet,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-phone-number')
	public async addPhoneNumber(AddPhoneNumberToAccountDto: AddPhoneNumberToAccountDto): Promise<AccountResponseDto> {
		const mobile = await this.accountService.addPhoneNumber(AddPhoneNumberToAccountDto);
		return {
			status: 202,
			message: 'phone number was successfully added to account.',
			data: mobile,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-utilities-personal-account')
	public async addUtilitiesPersonalAccount(
		findPersonalAccountDto: AddPersonalAccountDto,
	): Promise<AccountResponseDto> {
		const utilities = await this.accountService.addUtilitiesPersonalAccount(findPersonalAccountDto);
		return {
			status: 202,
			message: 'personal account was successfully added to account.',
			data: utilities,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-internet-balance')
	public async checkInternetBalance(personalAccount: number): Promise<AccountResponseDto> {
		const checkBalance = await this.accountService.checkInternetBalance(personalAccount);
		return {
			status: 202,
			message: `your internet balance is ${checkBalance.balance}.`,
			data: checkBalance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('pay-for-internet')
	public async payForInternet(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: InternetBalanceDto,
	): Promise<AccountResponseDto> {
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
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-mobile-balance')
	public async checkMobileBalance(phoneNumber: string): Promise<AccountResponseDto> {
		const checkBalance = await this.accountService.checkMobileBalance(phoneNumber);
		return {
			status: 202,
			message: `your mobile balance is ${checkBalance.balance}.`,
			data: checkBalance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('replenish-mobile-account')
	public async replenishMobileAccount(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: MobileBalanceDto,
	): Promise<AccountResponseDto> {
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
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-utilities-taxes')
	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<AccountResponseDto> {
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
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('pay-for-utilities')
	public async payForUtilities(
		decrementAccountBalanceDto: AccountBalanceDto,
		payForTaxes: UtilitiesTaxesDto,
	): Promise<AccountResponseDto> {
		const billing = await this.accountService.payForUtilities(decrementAccountBalanceDto, payForTaxes);
		return {
			status: 202,
			message: `your taxes was successfully paid.`,
			data: billing,
			errors: null,
		};
	}
}
