import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountBalanceDto } from '../../account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../account/entities/dtos/add-personal-account.dto';
import { AddTaxDto } from '../entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto } from '../entities/dtos/utilities-taxes.dto';
import { AccountEntity } from '../../account/entities/account.entity';
import { UtilitiesEntity } from '../entities/utilities.entity';
import { UtilitiesType } from '../../common/interfaces/enums/utilities-type.enum';
import {
	Bills,
	BalanceDtos,
	ReturnTypes,
	UtilitiesAccount,
	UtilitiesPaid,
} from '../../common/interfaces/generics/bills.generic';
import { AccountService } from '../../account/services/account.service';
import { UtilitiesPaymentService } from './utilities-payment.service';

export class UtilitiesService
	implements Bills<AddTaxDto, UtilitiesEntity, BalanceDtos, AddPersonalAccountDto, number, ReturnTypes>
{
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly accountService: AccountService,
		private readonly utilitiesPaymentService: UtilitiesPaymentService,
	) {}

	public async addClient(dto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesPaymentService.addClient(dto);
	}

	public async addAccount(dto: AddPersonalAccountDto): Promise<UtilitiesAccount> {
		const utilities = await this.utilitiesPaymentService.findAccount(dto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ utilities: utilities })
			.where({ name: dto.name, surname: dto.surname })
			.execute();

		const returnAccount = await this.accountRepository.findOneBy({
			name: dto.name,
			surname: dto.surname,
		});
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			utilities: utilities.personalAccount,
		};
	}

	public async checkBalance(account: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesPaymentService.checkBalance(account, type);
	}

	public async payForBills(decrement: AccountBalanceDto, increment: UtilitiesTaxesDto): Promise<UtilitiesPaid> {
		await this.accountService.withdrawalFromTheBalance(decrement);
		return await this.utilitiesPaymentService.payForBills(increment);
	}
}
