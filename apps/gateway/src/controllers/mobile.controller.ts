import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../common/decorators/auth.decorator';
import { AddMobileClientDto } from '../common/interfaces/dtos/account/add-mobile-client.dto';
import { MobileResponseDto } from '../common/interfaces/dtos/account/responses/mobile-response.dto';
import { ServiceMobileResponse } from '../common/interfaces/responses/service-mobile-add-client-response.interface';
import { AccountBalanceDto } from '../common/interfaces/dtos/account/account-balance.dto';
import { AddPhoneNumberToAccountDto } from '../common/interfaces/dtos/account/add-phone-number-to-account.dto';
import { MobileBalanceDto } from '../common/interfaces/dtos/account/mobile-balance.dto';

@Controller('mobile')
export class MobileController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Authorization(true)
	@Post('client')
	public async addMobileClient(@Body() addMobileClientDto: AddMobileClientDto): Promise<MobileResponseDto> {
		const addMobileClientResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('new-mobile-client', addMobileClientDto),
		);
		if (addMobileClientResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: addMobileClientResponse.message,
					data: null,
					errors: addMobileClientResponse.errors,
				},
				addMobileClientResponse.status,
			);
		}
		return {
			message: addMobileClientResponse.message,
			data: {
				mobile: addMobileClientResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('account')
	public async addPhoneNumber(
		@Body() addPhoneNumberToAccountDto: AddPhoneNumberToAccountDto,
	): Promise<MobileResponseDto> {
		const addPhoneNumberResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('add-phone-number', addPhoneNumberToAccountDto),
		);
		if (addPhoneNumberResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: addPhoneNumberResponse.message,
					data: null,
					errors: addPhoneNumberResponse.errors,
				},
				addPhoneNumberResponse.status,
			);
		}
		return {
			message: addPhoneNumberResponse.message,
			data: {
				mobile: addPhoneNumberResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Get('balance')
	public async checkMobileBalance(@Body() phoneNumber: string): Promise<MobileResponseDto> {
		const checkMobileBalanceResponse: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('check-mobile-balance', phoneNumber),
		);
		if (checkMobileBalanceResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: checkMobileBalanceResponse.message,
					data: null,
					errors: checkMobileBalanceResponse.errors,
				},
				checkMobileBalanceResponse.status,
			);
		}
		return {
			message: checkMobileBalanceResponse.message,
			data: {
				mobile: checkMobileBalanceResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('balance/replenish')
	public async replenishMobileAccount(
		@Body() decrementAccountBalanceDto: AccountBalanceDto,
		@Body() incrementInternetBalanceDto: MobileBalanceDto,
	): Promise<MobileResponseDto> {
		const replenishMobileAccount: ServiceMobileResponse = await firstValueFrom(
			this.accountClient.send('replenish-mobile-account', {
				decrementAccountBalanceDto: decrementAccountBalanceDto,
				incrementInternetBalanceDto: incrementInternetBalanceDto,
			}),
		);
		if (replenishMobileAccount.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: replenishMobileAccount.message,
					data: null,
					errors: replenishMobileAccount.errors,
				},
				replenishMobileAccount.status,
			);
		}
		return {
			message: replenishMobileAccount.message,
			data: {
				mobile: replenishMobileAccount.data,
			},
			errors: null,
		};
	}
}
