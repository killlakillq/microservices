import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternetPaymentService } from './internet-payment.service';
import { AddInternetClientDto } from '../entities/dtos/add-internet-client.dto';
import { InternetBalanceDto } from '../entities/dtos/internet-balance.dto';
import { InternetEntity } from '../entities/internet.entity';

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

	public async checkBalance(account: number): Promise<InternetEntity> {
		return await this.internetPaymentService.checkBalance(account);
	}

	public async payForBills(decrement: AccountBalanceDto, increment: InternetBalanceDto): Promise<Balance> {
		await this.accountService.withdrawalFromTheBalance(decrement);
		return await this.internetPaymentService.payForBills(increment);
	}
}
