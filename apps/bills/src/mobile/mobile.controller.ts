import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountBalanceDto, Balance } from '../account/entities/dtos/account-balance.dto';
import { AddMobileClientDto } from './entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from './entities/dtos/mobile-balance.dto';
import { MobileService } from './services/mobile.service';
import { AddPhoneNumberToAccountDto } from '../account/entities/dtos/add-phone-number-to-account.dto';
import { ServicesResponse } from '../common/interfaces/responses/services-response.interface';
import { MobileAccount } from '../common/interfaces/generics/bills.generic';
import { MobileEntity } from './entities/mobile.entity';

@Controller('mobile')
export class MobileController {
	public constructor(private readonly mobileService: MobileService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-mobile-client')
	public async addClient(dto: AddMobileClientDto): Promise<ServicesResponse<AddMobileClientDto>> {
		const create = await this.mobileService.addClient(dto);
		return {
			status: 202,
			message: 'the client was successfully created.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-phone-number')
	public async addAccount(dto: AddPhoneNumberToAccountDto): Promise<ServicesResponse<MobileAccount>> {
		const account = await this.mobileService.addAccount(dto);
		return {
			status: 202,
			message: 'phone number was successfully added to account.',
			data: account,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-mobile-balance')
	public async checkBalance(account: string): Promise<ServicesResponse<MobileEntity>> {
		const balance = await this.mobileService.checkBalance(account);
		return {
			status: 202,
			message: `your mobile balance is ${balance.balance}.`,
			data: balance,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('replenish-mobile-account')
	public async payForBills(
		decrement: AccountBalanceDto,
		increment: MobileBalanceDto,
	): Promise<ServicesResponse<Balance>> {
		const mobileAccount = await this.mobileService.payForBills(decrement, increment);
		return {
			status: 202,
			message: `the mobile balance was successfully replenished.`,
			data: mobileAccount,
			errors: null,
		};
	}
}
