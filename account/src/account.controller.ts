import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateAccountDto } from './interfaces/dto/create-account.dto';
import { CreateCardDto } from './interfaces/dto/create-card.dto';
import { AccountService } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@Post('createAccount')
	public async createAccount(@Body() dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountService.createAccount({ ...dto });
	}

	@Post('createCard')
	public async createCard(@Body() dto: CreateCardDto): Promise<CreateCardDto> {
		return await this.accountService.createCard({ ...dto });
	}

	@Get('/')
	public async getAcc() {
		return await this.accountService.getAcc();
	}

	@Get('/card')
	public async getCard() {
		return await this.accountService.getCard();
	}
}
