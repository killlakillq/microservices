import {
	AddTaxDto,
	ServicesResponse,
	AddPersonalAccountDto,
	UtilitiesAccount,
	UtilitiesType,
	UtilitiesEntity,
	UtilitiesTaxesDto,
} from '@microservices/models';
import { UtilitiesPaid } from '@microservices/models/interfaces/generics/bills.generic';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UtilitiesService } from './services/utilities.service';

@Controller('utilities')
export class UtilitiesController {
	public constructor(private readonly utilitiesService: UtilitiesService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('new-utilities-tax')
	public async addClient(dto: AddTaxDto): Promise<ServicesResponse<AddTaxDto>> {
		const create = await this.utilitiesService.addClient(dto);
		return {
			status: 202,
			message: 'the tax was successfully added.',
			data: create,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('add-utilities-personal-account')
	public async addAccount(dto: AddPersonalAccountDto): Promise<ServicesResponse<UtilitiesAccount>> {
		const utilities = await this.utilitiesService.addAccount(dto);
		return {
			status: 202,
			message: 'personal account was successfully added to account.',
			data: utilities,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('check-utilities-taxes')
	public async checkBalance(account: number, type: UtilitiesType): Promise<ServicesResponse<UtilitiesEntity>> {
		const taxes = await this.utilitiesService.checkBalance(account, type);
		if (!taxes) {
			return {
				status: 404,
				message: `you haven't taxes for utilities.`,
				data: null,
				errors: null,
			};
		}
		return {
			status: 202,
			message: `you have a taxes for utilities.`,
			data: taxes,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('pay-for-utilities')
	public async payForBills(increment: UtilitiesTaxesDto): Promise<ServicesResponse<UtilitiesPaid>> {
		const billing = await this.utilitiesService.payForBills(increment);
		return {
			status: 202,
			message: `your taxes was successfully paid.`,
			data: billing,
			errors: null,
		};
	}
}
