import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ICreateAccountWithCardResponse } from './interfaces/create-account-with-card-response.interface';
import { ICreateAccountResponse } from './interfaces/create-account-response.interface';
import { CreateAccountWithCardDto } from './interfaces/dto/create-account-with-card.dto';
import { CreateAccountDto } from './interfaces/dto/create-account.dto';
import { CreateCardDto } from './interfaces/dto/create-card.dto';
import { AccountService } from './services/account.service';
import { ICreateCardResponse } from './interfaces/create-card-response.interface';
import { MessagePattern } from '@nestjs/microservices';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@MessagePattern('create-account-with-card')
	public async createAccountWithCardDto(dto: CreateAccountWithCardDto): Promise<ICreateAccountWithCardResponse> {
		try {
			const accountWithCard = await this.accountService.createAccountWithCard(dto);
			return {
				status: HttpStatus.CREATED,
				message: 'account and card successfully created',
				account: accountWithCard,
				errors: null,
			};
		} catch (e) {
			return {
				status: HttpStatus.BAD_REQUEST,
				message: 'oops, something went wrong',
				account: null,
				errors: e.errors,
			};
		}
	}

	@MessagePattern('create-account')
	public async createAccount(dto: CreateAccountDto): Promise<ICreateAccountResponse> {
		try {
			const account = await this.accountService.createAccount(dto);
			return {
				status: HttpStatus.CREATED,
				message: 'account successfully created',
				account: account,
				errors: null,
			};
		} catch (e) {
			return {
				status: HttpStatus.BAD_REQUEST,
				message: 'oops, something went wrong',
				account: null,
				errors: e.errors,
			};
		}
	}

	@MessagePattern('create-card')
	public async createCard(dto: CreateCardDto): Promise<ICreateCardResponse> {
		try {
			const card = await this.accountService.createCard(dto);
			return {
				status: HttpStatus.CREATED,
				message: 'account successfully created',
				account: card,
				errors: null,
			};
		} catch (e) {
			return {
				status: HttpStatus.BAD_REQUEST,
				message: 'oops, something went wrong',
				account: null,
				errors: e.errors,
			};
		}
	}
}
