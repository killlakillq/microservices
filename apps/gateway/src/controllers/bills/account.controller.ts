import { Controller, Inject, Post, Body, HttpStatus, HttpException, Get, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import { Account } from '../../common/interfaces/account.interface';
import { ServicesResponse, AccountBalanceDto } from '@microservices/models';

@Controller('account')
export class AccountController {
	constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

	@Get('balance')
	public async checkBalance(@Req() id: string): Promise<ServicesResponse<Account>> {
		const { status, message, data, errors }: ServicesResponse<Account> = await firstValueFrom(
			this.client.send('check-balance', id),
		);
		if (status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: message,
					data: null,
					errors: errors,
				},
				status,
			);
		}
		return {
			status: status,
			message: message,
			data: data,
			errors: null,
		};
	}

	@Authorization(true)
	@Post('balance/replenish')
	public async replenishBalance(@Body() dto: AccountBalanceDto): Promise<ServicesResponse<Account>> {
		const { status, message, data, errors }: ServicesResponse<Account> = await firstValueFrom(
			this.client.send('balance-replenishment', dto),
		);
		if (status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: message,
					data: null,
					errors,
				},
				status,
			);
		}
		return {
			status: status,
			message: message,
			data: data,
			errors: null,
		};
	}
}
