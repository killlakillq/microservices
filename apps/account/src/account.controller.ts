import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountService } from './services/account.service';
import { CreateAccountDto, ServicesResponse, Balance, AccountBalanceDto } from '@microservices/models';

@Controller('account')
export class AccountController {
	public constructor(private readonly accountService: AccountService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('create-account')
	public async createAccount(dto: CreateAccountDto): Promise<ServicesResponse<CreateAccountDto>> {
		const create = await this.accountService.createAccount(dto);
		return {
			status: 202,
			message: 'the account was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-balance')
	public async checkBalance(id: string): Promise<ServicesResponse<Balance>> {
		const check = await this.accountService.checkBalance(id);
		return {
			status: 202,
			message: 'the tax was successfully added.',
			data: check,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('replenish-balance')
	public async replenishBalance(dto: AccountBalanceDto): Promise<ServicesResponse<Balance>> {
		const balance = await this.accountService.replenishBalance(dto);
		return {
			status: 202,
			message: 'the account balance was successfully replenished.',
			data: balance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('withdrawal-from-the-balance')
	public async withdrawalFromTheBalance(decrement: AccountBalanceDto) {
		const balance = await this.accountService.withdrawalFromTheBalance(decrement);
		return {
			status: 202,
			message: 'the account balance was successfully decrement.',
			data: balance,
			errors: null,
		};
	}
}
