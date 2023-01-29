import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddInternetClientDto } from 'src/interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from 'src/interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from 'src/interfaces/dto/add-tax.dto';
import { CreateAccountDto } from 'src/interfaces/dto/create-account.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from './../interfaces/entities/account.entity';
import { UtilitiesType } from './../interfaces/enums/utilities-type.enum';
import { InternetPayment, MobilePayment, UtilitiesPayment } from './payment.service';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly internetPayment: InternetPayment,
		private readonly mobilePayment: MobilePayment,
		private readonly utilitiesPayment: UtilitiesPayment,
	) {}

	public async createAccount(dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountRepository.save({ ...dto });
	}

	public async addInternetClient(dto: AddInternetClientDto) {
		return await this.internetPayment.addInternetClient(dto);
	}

	public async addMobileClient(dto: AddMobileClientDto) {
		return await this.mobilePayment.addMobileClient(dto);
	}

	public async addTax(dto: AddTaxDto) {
		return await this.utilitiesPayment.addTax(dto);
	}

	public async balanceReplenishment(sum: number) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let numberFromJson: any = 0;
		Object.values(sum).forEach((val) => (numberFromJson += val));

		const dataSource = this.accountRepository.createQueryBuilder();
		const updatedData = await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', numberFromJson)
			.execute();
		return updatedData.raw;
		// return empty array = need fix
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
