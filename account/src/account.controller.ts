import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { InternetEntity } from './interfaces/entities/internet.entity';
import { InternetPayment } from './services/account.service';

@Controller('account')
export class AccountController {
	constructor(private readonly internetService: InternetPayment) {}

	@Get('/')
	public async getInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetService.getInternetBalance(personalAccount);
	}

	@Post('/')
	public async internetPay(@Body() personalAccount: number, @Body() sum: number): Promise<InternetEntity> {
		const tax = await this.internetService.getInternetBalance(personalAccount);
		if (!tax) {
			throw new NotFoundException();
		}
		return await this.internetService.internetPay(sum);
	}
}
