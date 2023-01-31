import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddInternetClientDto } from './../interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from './../interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from './../interfaces/dto/add-tax.dto';
import { CreateAccountDto } from './../interfaces/dto/create-account.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from './../interfaces/entities/account.entity';
import { UtilitiesType } from './../interfaces/enums/utilities-type.enum';
import { InternetPayment, MobilePayment, UtilitiesPayment } from './payment.service';
import { InternetEntity } from '../interfaces/entities/internet.entity';
import { MobileEntity } from '../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from '../interfaces/entities/utilities.entity';
import { PayForInternetDto } from '../interfaces/dto/pay-for-internet.dto';
import { IncrementOrDecrementAccountBalanceDto } from '../interfaces/dto/increment-decrement-account-balance.dto';

// balance running in minus, need fix
// need release relations with table that accounts will be with personal accounts and phone numbers
// replenish balances only with personal account or phone number

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

	public async addInternetClient(dto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetPayment.addInternetClient(dto);
	}

	public async addMobileClient(dto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobilePayment.addMobileClient(dto);
	}

	public async addTax(dto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesPayment.addTax(dto);
	}

	public async checkBalance(name: string, surname: string): Promise<AccountEntity> {
		return await this.accountRepository.findOneBy({ name, surname });
	}

	public async balanceReplenishment({
		name,
		surname,
		sum,
	}: IncrementOrDecrementAccountBalanceDto): Promise<AccountEntity[]> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', sum)
			.where({ name, surname })
			.execute();
		return await this.accountRepository.find({ select: { balance: true } });
	}

	public async payForInternet(
		{ name, surname, sum }: IncrementOrDecrementAccountBalanceDto,
		incrementInternetBalanceDto: PayForInternetDto,
	): Promise<AccountEntity[]> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.where({ name, surname })
			.execute();
		await this.internetPayment.internetPay(incrementInternetBalanceDto);
		return await this.accountRepository.find({ select: { balance: true } });
	}

	public async checkInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetPayment.checkInternetBalance(personalAccount);
	}

	public async checkMobileBalance(phoneNumber: number): Promise<MobileEntity> {
		return await this.mobilePayment.checkMobileBalance(phoneNumber);
	}

	public async mobileAccountTopUp(sum: number): Promise<MobileEntity> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.mobilePayment.topUpTheAccount(sum);
	}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesPayment.checkUtilitiesTaxes(personalAccount, type);
	}

	public async payForUtilities(personalAccount: number, type: UtilitiesType, sum: number): Promise<UtilitiesEntity> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.execute();
		return await this.utilitiesPayment.payForUtilities(personalAccount, type, sum);
	}
}
