import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import { AddInternetClientDto } from '../../common/interfaces/dtos/bills/add-internet-client.dto';
import { AccountBalanceDto } from '../../common/interfaces/dtos/bills/account-balance.dto';
import { AddPersonalAccountDto } from '../../common/interfaces/dtos/bills/add-personal-account.dto';
import { InternetBalanceDto } from '../../common/interfaces/dtos/bills/internet-balance.dto';
import { ServicesResponse } from '../../common/interfaces/responses/services-response.interface';
import { Internet } from '../../common/interfaces/Internet.interface';

@Controller('internet')
export class InternetController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

	@Authorization(true)
	@Post('client')
	public async addClient(@Body() dto: AddInternetClientDto): Promise<ServicesResponse<Internet>> {
		const { status, message, data, errors }: ServicesResponse<Internet> = await firstValueFrom(
			this.client.send('new-internet-client', dto),
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
			this.client.send('add-internet-personal-account', dto),
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
			this.client.send('check-internet-balance', account),
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
		const { status, message, data, errors }: ServicesResponse<Internet> = await firstValueFrom(
			this.client.send('check-internet-balance', {
				decrement: decrement,
				increment: increment,
			}),
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
}
