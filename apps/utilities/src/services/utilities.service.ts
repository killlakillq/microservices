import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilitiesPaymentService } from './utilities-payment.service';
import {
	Bills,
	AddTaxDto,
	UtilitiesEntity,
	AddPersonalAccountDto,
	AccountEntity,
	UtilitiesType,
	UtilitiesTaxesDto,
	BalanceDtos,
	ReturnTypes,
	UtilitiesAccount,
	UtilitiesPaid,
} from '@microservices/models';

export class UtilitiesService
	implements Bills<AddTaxDto, UtilitiesEntity, BalanceDtos, AddPersonalAccountDto, number, ReturnTypes>
{
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
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

	public async payForBills(increment: UtilitiesTaxesDto): Promise<UtilitiesPaid> {
		return await this.utilitiesPaymentService.payForBills(increment);
	}
}
