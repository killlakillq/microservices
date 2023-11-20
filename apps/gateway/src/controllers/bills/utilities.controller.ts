import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import { AddTaxDto, ServicesResponse, AddPersonalAccountDto, UtilitiesType, AccountBalanceDto, UtilitiesTaxesDto, Utilities } from '@microservices/models';

@Controller('utilities')
export class UtilitiesController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

	@Authorization(true)
	@Post('client')
	public async addClient(@Body() dto: AddTaxDto): Promise<ServicesResponse<Utilities>> {
		const { status, message, data, errors }: ServicesResponse<Utilities> = await firstValueFrom(
			this.client.send('new-utilities-tax', dto),
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
	public async addAccount(@Body() dto: AddPersonalAccountDto): Promise<ServicesResponse<Utilities>> {
		const { status, message, data, errors }: ServicesResponse<Utilities> = await firstValueFrom(
			this.client.send('add-utilities-personal-account', dto),
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

	@Get('balance')
	public async checkBalance(
		@Body() account: number,
		@Body() type: UtilitiesType,
	): Promise<ServicesResponse<Utilities>> {
		const { status, message, data, errors }: ServicesResponse<Utilities> = await firstValueFrom(
			this.client.send('check-utilities-taxes', {
				account: account,
				type: type,
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

	@Authorization(true)
	@Post('pay')
	public async payForBills(
		@Body() decrement: AccountBalanceDto,
		@Body() increment: UtilitiesTaxesDto,
	): Promise<ServicesResponse<Utilities>> {
		const { status, message, data, errors }: ServicesResponse<Utilities> = await firstValueFrom(
			this.client.send('pay-for-utilities', {
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
