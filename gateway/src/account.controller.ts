import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateAccountResponseDto } from './interfaces/dto/account/create-account-response.dto';
import { CreateAccountDto } from './interfaces/dto/account/create-account.dto';
import { ServiceAccountCreateResponse } from './interfaces/service-account-create-response.interface';

@Controller('account')
export class AccountController {
	constructor(@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy) {}

	@Post('/createaccount')
	public async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<CreateAccountResponseDto> {
		const createAccountResponse: ServiceAccountCreateResponse = await firstValueFrom(
			this.accountClient.send('create-account', createAccountDto),
		);
		if (createAccountResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: createAccountResponse.message,
					data: null,
					errors: createAccountResponse.errors,
				},
				createAccountResponse.status,
			);
		}

		return {
			message: createAccountResponse.message,
			data: {
				account: createAccountResponse.account,
			},
			errors: null,
		};
	}
}
