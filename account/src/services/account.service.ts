import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './../interfaces/entities/account.entity';
import { UtilitiesType } from './../interfaces/enums/utilities-type.enum';
import { InternetPayment, MobilePayment, UtilitiesPayment } from './payment.service';

@Injectable()
export class AccountService {
	private readonly internetPayment: InternetPayment;
	private readonly mobilePayment: MobilePayment;
	private readonly utilitiesPayment: UtilitiesPayment;

	constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

	public async balanceReplenishment(sum: number) {
		const dataSource = this.accountRepository.createQueryBuilder();
		const updatedBalance = await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', sum)
			.execute();
		return await updatedBalance.raw();
	}

	public async checkInternetBalance(personalAccount: number) {
		return await this.internetPayment.checkInternetBalance(personalAccount);
	}

	public async payForInternet(sum: number) {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.internetPayment.internetPay(sum);
	}

	public async checkMobileBalance(phoneNumber: number) {
		return await this.mobilePayment.checkMobileBalance(phoneNumber);
	}

	public async mobileAccountTopUp(sum: number) {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.mobilePayment.topUpTheAccount(sum);
	}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType) {
		return await this.utilitiesPayment.checkUtilitiesTaxes(personalAccount, type);
	}

	public async payForUtilities(personalAccount: number, type: UtilitiesType, sum: number) {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.utilitiesPayment.payForUtilities(personalAccount, type, sum);
	}
}
