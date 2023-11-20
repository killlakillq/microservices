import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import {
	AddInternetClientDto,
	ServicesResponse,
	AddPersonalAccountDto,
	AccountBalanceDto,
	InternetBalanceDto,
	Internet,
} from '@microservices/models';

@Controller('internet')
export class InternetController {
	public constructor(
		@Inject('INTERNET_SERVICE') private readonly internetClient: ClientProxy,
		@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
	) {}

	@Authorization(true)
	@Post('client')
	public async addClient(@Body() dto: AddInternetClientDto): Promise<ServicesResponse<Internet>> {
		const { status, message, data, errors }: ServicesResponse<Internet> = await firstValueFrom(
			this.internetClient.send('new-internet-client', dto),
		);
		if (status !== HttpStatus.CREATED) {
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
	@Post('account')
	public async addAccount(@Body() dto: AddPersonalAccountDto): Promise<ServicesResponse<Internet>> {
		const { status, message, data, errors }: ServicesResponse<Internet> = await firstValueFrom(
			this.internetClient.send('add-internet-personal-account', dto),
		);
		if (status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: message,
					data: null,
					erros: errors,
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

	@Get('balance')
	public async checkBalance(@Body() account: number): Promise<ServicesResponse<Internet>> {
		const { status, message, data, errors }: ServicesResponse<Internet> = await firstValueFrom(
			this.internetClient.send('check-internet-balance', account),
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
	@Post('pay')
	public async payForBills(
		@Body() decrement: AccountBalanceDto,
		@Body() increment: InternetBalanceDto,
	): Promise<ServicesResponse<Internet>> {
		let internet: ServicesResponse<Internet>;
		const account = await firstValueFrom(this.accountClient.send('withdrawal-from-the-balance', decrement));

		if (account) {
			internet = await firstValueFrom(
				this.internetClient.send('pay-for-internet', {
					increment: increment,
				}),
			);
		} else {
			throw new HttpException(
				{
					message: account.message,
					data: null,
					errors: account.errors,
				},
				account.status,
			);
		}

		if (internet.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: internet.message,
					data: null,
					errors: internet.errors,
				},
				internet.status,
			);
		}
		return {
			status: internet.status,
			message: internet.message,
			data: internet.data,
			errors: null,
		};
	}
}
