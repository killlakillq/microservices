import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountBalanceDto, Balance } from '../../account/entities/dtos/account-balance.dto';
import { AddPersonalAccountDto } from '../../account/entities/dtos/add-personal-account.dto';
import { AddInternetClientDto } from '../entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../entities/dtos/internet-balance.dto';
import { AccountEntity } from '../../account/entities/account.entity';
import { InternetEntity } from '../entities/internet.entity';
import { Bills, BalanceDtos, ReturnTypes, InternetAccount } from '../../common/interfaces/generics/bills.generic';
import { AccountService } from '../../account/services/account.service';
import { InternetPaymentService } from './internet-payment.service';

export class InternetService
	implements Bills<AddInternetClientDto, InternetEntity, BalanceDtos, AddPersonalAccountDto, number, ReturnTypes>
{
	public constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly accountService: AccountService,
		private readonly internetPaymentService: InternetPaymentService,
	) {}

	public async addClient(dto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetPaymentService.addClient(dto);
	}

	public async addAccount(dto: AddPersonalAccountDto): Promise<InternetAccount> {
		const internet = await this.internetPaymentService.findAccount(dto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ internet: internet })
			.where({ name: dto.name, surname: dto.surname })
			.execute();

		const returnAccount = await this.accountRepository.findOneBy({
			name: dto.name,
			surname: dto.surname,
		});
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			internet: internet.personalAccount,
		};
	}

	public async checkBalance(data: number): Promise<InternetEntity> {
		return await this.internetPaymentService.checkBalance(data);
	}

	public async payForBills(decrement: AccountBalanceDto, increment: InternetBalanceDto): Promise<Balance> {
		await this.accountService.withdrawalFromTheBalance(decrement);
		return await this.internetPaymentService.payForBills(increment);
	}
}
