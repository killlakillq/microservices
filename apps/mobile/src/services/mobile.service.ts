import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountService } from '../../account/services/account.service';
import { AccountBalanceDto, Balance } from '../../account/entities/dtos/account-balance.dto';
import { AddPhoneNumberToAccountDto } from '../../account/entities/dtos/add-phone-number-to-account.dto';
import { AddMobileClientDto } from '../entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../entities/dtos/mobile-balance.dto';
import { AccountEntity } from '../../account/entities/account.entity';
import { MobileEntity } from '../entities/mobile.entity';
import { Bills, BalanceDtos, ReturnTypes, MobileAccount } from '../../common/interfaces/generics/bills.generic';
import { MobilePaymentService } from './mobile-payment.service';

export class MobileService
	implements Bills<AddMobileClientDto, MobileEntity, BalanceDtos, AddPhoneNumberToAccountDto, string, ReturnTypes>
{
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly accountService: AccountService,
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

	public async payForBills(decrement: AccountBalanceDto, increment: MobileBalanceDto): Promise<Balance> {
		await this.accountService.withdrawalFromTheBalance(decrement);
		return await this.mobilePaymentService.payForBills(increment);
	}
}
