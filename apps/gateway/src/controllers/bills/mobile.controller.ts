import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../../common/decorators/auth.decorator';
import {
	AddMobileClientDto,
	ServicesResponse,
	AddPhoneNumberToAccountDto,
	AccountBalanceDto,
	MobileBalanceDto,
	Mobile,
} from '@microservices/models';

@Controller('mobile')
export class MobileController {
	public constructor(
		@Inject('MOBILE_SERVICE') private readonly mobileClient: ClientProxy,
		@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
	) {}

	@Authorization(true)
	@Post('client')
	public async addClient(@Body() dto: AddMobileClientDto): Promise<ServicesResponse<Mobile>> {
		const { status, message, data, errors }: ServicesResponse<Mobile> = await firstValueFrom(
			this.mobileClient.send('new-mobile-client', dto),
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
			this.mobileClient.send('add-phone-number', dto),
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
			this.mobileClient.send('check-mobile-balance', account),
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
		let mobile: ServicesResponse<Mobile>;
		const account = await firstValueFrom(this.accountClient.send('withdrawal-from-the-balance', decrement));

		if (account) {
			mobile = await firstValueFrom(
				this.mobileClient.send('replenish-mobile-account', {
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

		if (mobile.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: mobile.message,
					data: null,
					errors: mobile.errors,
				},
				mobile.status,
			);
		}
		return {
			status: mobile.status,
			message: mobile.message,
			data: mobile.data,
			errors: null,
		};
	}
}
