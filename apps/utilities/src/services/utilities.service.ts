import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTaxDto } from '../entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto } from '../entities/dtos/utilities-taxes.dto';
import { UtilitiesEntity } from '../entities/utilities.entity';
import { UtilitiesPaymentService } from './utilities-payment.service';
import { AccountEntity } from '../../../account/src/entities/account.entity';
import { AccountBalanceDto } from '../../../account/src/entities/dtos/account-balance.dto';
import { AccountService } from '../../../account/src/services/account.service';

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
