import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountBalanceDto, Balance } from '../account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../account/entities/dtos/add-personal-account.dto';
import { AddInternetClientDto } from './entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from './entities/dtos/internet-balance.dto';
import { InternetService } from './services/internet.service';
import { ServicesResponse } from '../common/interfaces/responses/services-response.interface';
import { InternetEntity } from './entities/internet.entity';
import { InternetAccount } from '../common/interfaces/generics/bills.generic';

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
