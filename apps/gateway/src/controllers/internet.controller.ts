import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../common/decorators/auth.decorator';
import { AddInternetClientDto } from '../common/interfaces/dtos/account/add-internet-client.dto';
import { InternetResponseDto } from '../common/interfaces/dtos/account/responses/internet-response.dto';
import { ServiceInternetResponse } from '../common/interfaces/responses/service-internet-response.interface';
import { AccountBalanceDto } from '../common/interfaces/dtos/account/account-balance.dto';
import { AddPersonalAccountDto } from '../common/interfaces/dtos/account/add-personal-account.dto';
import { InternetBalanceDto } from '../common/interfaces/dtos/account/internet-balance.dto';

@Controller('internet')
export class InternetController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Authorization(true)
	@Post('client')
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
	@Post('account')
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

	@Get('balance')
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
	@Post('pay')
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
}
