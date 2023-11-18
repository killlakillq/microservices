import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import { Mobile } from '../../common/interfaces/mobile.interface';
import { AddMobileClientDto, ServicesResponse, AddPhoneNumberToAccountDto, AccountBalanceDto, MobileBalanceDto } from '@microservices/models';

@Controller('mobile')
export class MobileController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientProxy) {}

	@Authorization(true)
	@Post('client')
	public async addClient(@Body() dto: AddMobileClientDto): Promise<ServicesResponse<Mobile>> {
		const { status, message, data, errors }: ServicesResponse<Mobile> = await firstValueFrom(
			this.client.send('new-mobile-client', dto),
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
	public async addAccount(@Body() dto: AddPhoneNumberToAccountDto): Promise<ServicesResponse<Mobile>> {
		const { status, message, data, errors }: ServicesResponse<Mobile> = await firstValueFrom(
			this.client.send('add-phone-number', dto),
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
	@Get('balance')
	public async checkBalance(@Body() account: string): Promise<ServicesResponse<Mobile>> {
		const { status, message, data, errors }: ServicesResponse<Mobile> = await firstValueFrom(
			this.client.send('check-mobile-balance', account),
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
	public async replenishBalance(
		@Body() decrement: AccountBalanceDto,
		@Body() increment: MobileBalanceDto,
	): Promise<ServicesResponse<Mobile>> {
		const { status, message, data, errors }: ServicesResponse<Mobile> = await firstValueFrom(
			this.client.send('replenish-mobile-account', {
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
