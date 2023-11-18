import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AddInternetClientDto } from './src/entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from './src/entities/dtos/internet-balance.dto';
import { InternetEntity } from './src/entities/internet.entity';
import { InternetService } from './src/services/internet.service';

@Controller('internet')
export class InternetController {
	public constructor(private readonly internetService: InternetService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-internet-client')
	public async addClient(dto: AddInternetClientDto): Promise<ServicesResponse<AddInternetClientDto>> {
		const create = await this.internetService.addClient(dto);
		return {
			status: 202,
			message: 'the client was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-internet-personal-account')
	public async addInternetPersonalAccount(dto: AddPersonalAccountDto): Promise<ServicesResponse<InternetAccount>> {
		const internet = await this.internetService.addAccount(dto);
		return {
			status: 202,
			message: 'personal account was successfully added to account.',
			data: internet,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-internet-balance')
	public async checkBalance(account: number): Promise<ServicesResponse<InternetEntity>> {
		const checkBalance = await this.internetService.checkBalance(account);
		return {
			status: 202,
			message: `your internet balance is ${checkBalance.balance}.`,
			data: checkBalance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('pay-for-internet')
	public async payForBills(
		decrement: AccountBalanceDto,
		increment: InternetBalanceDto,
	): Promise<ServicesResponse<Balance>> {
		const internetAccount = await this.internetService.payForBills(decrement, increment);
		return {
			status: 202,
			message: 'the internet balance was successfully paid.',
			data: internetAccount,
			errors: null,
		};
	}
}
