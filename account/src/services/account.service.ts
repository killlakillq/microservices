import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './../interfaces/entities/account.entity';
import { InternetPayment, MobilePayment, UtilitiesPayment } from './payment.service';

@Injectable()
export class AccountService {
	private readonly internetPayment: InternetPayment;
	private readonly MobilePayment: MobilePayment;
	private readonly UtilitiesPayment: UtilitiesPayment;

	constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

	public async balanceReplenishment(sum: number) {
		const dataSource = this.accountRepository.createQueryBuilder();
		const updatedBalance = await dataSource
			.insert()
			.into(AccountEntity)
			.values({
				balance: sum,
			})
			.execute();
		return await updatedBalance.raw();
	}

	public async payForInternet(personalAccount: number, sum: number) {
		const findAccount = await this.internetPayment.checkInternetBalance(personalAccount);
		if (!findAccount) {
			throw new NotFoundException();
		}
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.internetPayment.internetPay(sum);
	}
}


// todo: add methods for utilities and mobile bills. add interfaces for account service and error handling