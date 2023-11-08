import { Controller, Inject, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../common/decorators/auth.decorator';
import { AccountBalanceDto } from '../common/interfaces/dtos/account/account-balance.dto';
import { AccountResponseDto } from '../common/interfaces/dtos/account/responses/account-response.dto';
import { ServiceAccountResponse } from '../common/interfaces/responses/service-account-response.interface';

@Controller('account')
export class AccountController {
	constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Post('balance')
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
	@Post('balance/replenish')
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
}
