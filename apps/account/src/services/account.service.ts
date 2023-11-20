import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { AccountEntity, Balance, CreateAccountDto, AccountBalanceDto } from '@microservices/models';

@Injectable()
export class AccountService {
	constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

	public async createAccount(dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountRepository.save({ ...dto });
	}

	public async checkBalance(id: string): Promise<AccountEntity> {
		return await this.accountRepository.findOneBy({ id });
	}

	public async replenishBalance(dto: AccountBalanceDto): Promise<Balance> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', dto.sum)
			.where({ name: dto.name, surname: dto.surname })
			.execute();

		const returnBalance = await this.accountRepository.findOneBy({ name: dto.name, surname: dto.surname });
		return { balance: returnBalance.balance };
	}

	public async withdrawalFromTheBalance(dto: AccountBalanceDto): Promise<Balance> {
		const account = await this.accountRepository.findOneBy({ name: dto.name, surname: dto.surname });

		if (account.balance < 0 || dto.sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', dto.sum)
			.where({ name: dto.name, surname: dto.surname })
			.execute();

		return { balance: account.balance };
	}
}
