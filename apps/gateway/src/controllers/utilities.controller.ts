import { Inject, Post, Body, HttpStatus, HttpException, Controller, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Authorization } from '../common/decorators/auth.decorator';
import { AddTaxDto } from '../common/interfaces/dtos/account/add-utilities-tax.dto';
import { UtilitiesResponseDto } from '../common/interfaces/dtos/account/responses/utilities-response.dto';
import { ServiceUtilitiesResponse } from '../common/interfaces/responses/service-utilities-response';
import { AccountBalanceDto } from '../common/interfaces/dtos/account/account-balance.dto';
import { AddPersonalAccountDto } from '../common/interfaces/dtos/account/add-personal-account.dto';
import { UtilitiesTaxesDto } from '../common/interfaces/dtos/account/utilities-taxes.dto';
import { UtilitiesType } from '../common/interfaces/enums/utilities-type.enum';

@Controller('utilities')
export class UtilitiesController {
	public constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Authorization(true)
	@Post('client')
	public async addTax(@Body() addTaxDto: AddTaxDto): Promise<UtilitiesResponseDto> {
		const addUtilitiesTaxResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('new-utilities-tax', addTaxDto),
		);
		if (addUtilitiesTaxResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: addUtilitiesTaxResponse.message,
					data: null,
					errors: addUtilitiesTaxResponse.errors,
				},
				addUtilitiesTaxResponse.status,
			);
		}
		return {
			message: addUtilitiesTaxResponse.message,
			data: {
				utilities: addUtilitiesTaxResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('account')
	public async addUtilitiesPersonalAccount(
		@Body() addPersonalAccountDto: AddPersonalAccountDto,
	): Promise<UtilitiesResponseDto> {
		const addUtilitiesPersonalAccountResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('add-utilities-personal-account', addPersonalAccountDto),
		);
		if (addUtilitiesPersonalAccountResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: addUtilitiesPersonalAccountResponse.message,
					data: null,
					errors: addUtilitiesPersonalAccountResponse.errors,
				},
				addUtilitiesPersonalAccountResponse.status,
			);
		}
		return {
			message: addUtilitiesPersonalAccountResponse.message,
			data: {
				utilities: addUtilitiesPersonalAccountResponse.data,
			},
			errors: null,
		};
	}

	@Get('balance')
	public async checkUtilitiesTaxes(
		@Body() personalAccount: number,
		@Body() type: UtilitiesType,
	): Promise<UtilitiesResponseDto> {
		const checkUtilitiesTaxesResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('check-utilities-taxes', {
				personalAccount: personalAccount,
				type: type,
			}),
		);
		if (checkUtilitiesTaxesResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: checkUtilitiesTaxesResponse.message,
					data: null,
					errors: checkUtilitiesTaxesResponse.errors,
				},
				checkUtilitiesTaxesResponse.status,
			);
		}
		return {
			message: checkUtilitiesTaxesResponse.message,
			data: {
				utilities: checkUtilitiesTaxesResponse.data,
			},
			errors: null,
		};
	}

	@Authorization(true)
	@Post('pay')
	public async payForUtilities(
		@Body() decrementAccountBalanceDto: AccountBalanceDto,
		@Body() payForTaxes: UtilitiesTaxesDto,
	): Promise<UtilitiesResponseDto> {
		const payForUtilitiesResponse: ServiceUtilitiesResponse = await firstValueFrom(
			this.accountClient.send('pay-for-utilities', {
				decrementAccountBalanceDto: decrementAccountBalanceDto,
				payForTaxes: payForTaxes,
			}),
		);
		if (payForUtilitiesResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: payForUtilitiesResponse.message,
					data: null,
					errors: payForUtilitiesResponse.errors,
				},
				payForUtilitiesResponse.status,
			);
		}
		return {
			message: payForUtilitiesResponse.message,
			data: {
				utilities: payForUtilitiesResponse.data,
			},
			errors: null,
		};
	}
}
