import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountBalanceDto } from './entities/dtos/account-balance.dto';
import { AccountResponseDto } from './entities/dtos/account-reponse.dto';
import { CreateAccountDto } from './entities/dtos/create-account.dto';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	public constructor(private readonly accountService: AccountService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('create-account')
	public async createAccount(dto: CreateAccountDto): Promise<AccountResponseDto> {
		const create = this.accountService.createAccount(dto);
		return {
			status: 202,
			message: 'the account was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-balance')
	public async checkBalance(name: string, surname: string): Promise<AccountResponseDto> {
		const check = await this.accountService.checkBalance(name, surname);
		return {
			status: 202,
			message: 'the tax was successfully added.',
			data: check,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('balance-replenishment')
	public async replenishBalance(dto: AccountBalanceDto): Promise<AccountResponseDto> {
		const balance = await this.accountService.replenishBalance(dto);
		return {
			status: 202,
			message: 'the account balance was successfully replenished.',
			data: balance,
			errors: null,
		};
	}
}
