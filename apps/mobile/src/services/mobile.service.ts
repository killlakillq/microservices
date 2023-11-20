import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MobilePaymentService } from './mobile-payment.service';
import {
	Bills,
	AddMobileClientDto,
	MobileEntity,
	AddPhoneNumberToAccountDto,
	AccountEntity,
	MobileBalanceDto,
	Balance,
} from '@microservices/models';
import { BalanceDtos, ReturnTypes, MobileAccount } from '@microservices/models/interfaces/generics/bills.generic';

export class MobileService
	implements Bills<AddMobileClientDto, MobileEntity, BalanceDtos, AddPhoneNumberToAccountDto, string, ReturnTypes>
{
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly mobilePaymentService: MobilePaymentService,
	) {}

	public async addClient(dto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobilePaymentService.addClient(dto);
	}

	public async addAccount(dto: AddPhoneNumberToAccountDto): Promise<MobileAccount> {
		const mobile = await this.mobilePaymentService.findAccount(dto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ mobile: mobile })
			.where({ name: dto.name, surname: dto.surname })
			.execute();

		const returnAccount = await this.accountRepository.findOneBy({
			name: dto.name,
			surname: dto.surname,
		});
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			mobile: mobile.phoneNumber,
			operator: mobile.operator,
		};
	}

	public async checkBalance(account: string): Promise<MobileEntity> {
		return await this.mobilePaymentService.checkBalance(account);
	}

	public async payForBills(increment: MobileBalanceDto): Promise<Balance> {
		return await this.mobilePaymentService.payForBills(increment);
	}
}
