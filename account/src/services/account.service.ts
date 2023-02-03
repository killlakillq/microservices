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
import { InternetBalanceDto } from '../interfaces/dto/internet-balance.dto';
import { AccountBalanceDto } from '../interfaces/dto/account-balance.dto';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { MobileBalanceDto } from '../interfaces/dto/mobile-balance.dto';
import { UtilitiesTaxesDto } from '../interfaces/dto/utilities-taxes.dto';
import { AddPhoneNumberToAccountDto } from '../interfaces/dto/add-phone-number-to-account.dto';
import { AddPersonalAccountDto } from '../interfaces/dto/add-personal-account.dto';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		private readonly internetPayment: InternetPayment,
		private readonly mobilePayment: MobilePayment,
		private readonly utilitiesPayment: UtilitiesPayment,
	) {}

	public async createAccount(createAccountDto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountRepository.save({ ...createAccountDto });
	}

	public async addInternetClient(addInternetClientDto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetPayment.addInternetClient(addInternetClientDto);
	}

	public async addMobileClient(addMobileClientDto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobilePayment.addMobileClient(addMobileClientDto);
	}

	public async addTax(addTaxDto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesPayment.addTax(addTaxDto);
	}

	public async checkBalance(name: string, surname: string): Promise<AccountEntity> {
		return await this.accountRepository.findOneBy({ name, surname });
	}

	public async balanceReplenishment({ name, surname, sum }: AccountBalanceDto): Promise<{ balance: number }> {
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', sum)
			.where({ name, surname })
			.execute();

		const returnBalance = await this.accountRepository.findOneBy({ name, surname });
		return { balance: returnBalance.balance };
	}

	public async withdrawalFromTheBalance({ name, surname, sum }: AccountBalanceDto): Promise<{ balance: number }> {
		const account = await this.accountRepository.find();
		const findBalance = account.find((index) => index.balance);

		if (findBalance.balance < 0 || sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource
			.update(AccountEntity)
			.set({ balance: () => 'balance - :sum' })
			.setParameter('sum', sum)
			.where({ name, surname })
			.execute();

		const returnBalance = await this.accountRepository.findOneBy({ name, surname });
		return { balance: returnBalance.balance };
	}

	public async addInternetPersonalAccount(
		{ name, surname }: AddPersonalAccountDto,
		findPersonalAccountDto: AddPersonalAccountDto,
	): Promise<{ name: string; surname: string; internet: number }> {
		const internet = await this.internetPayment.findPersonalAccount(findPersonalAccountDto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource.update(AccountEntity).set({ internet: internet }).where({ name, surname }).execute();

		const returnAccount = await this.accountRepository.findOneBy({ name, surname });
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			internet: internet.personalAccount,
		};
	}

	public async addPhoneNumber(
		{ name, surname }: AddPhoneNumberToAccountDto,
		findPhoneNumberDto: AddPhoneNumberToAccountDto,
	): Promise<{ name: string; surname: string; mobile: string }> {
		const mobile = await this.mobilePayment.findPhoneNumber(findPhoneNumberDto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource.update(AccountEntity).set({ mobile: mobile }).where({ name, surname }).execute();

		const returnAccount = await this.accountRepository.findOneBy({ name, surname });
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			mobile: mobile.phoneNumber,
		};
	}

	public async addUtilitiesPersonalAccount(
		{ name, surname }: AddPersonalAccountDto,
		findPersonalAccountDto: AddPersonalAccountDto,
	): Promise<{ name: string, surname: string, utilities: number }> {
		const utilities = await this.utilitiesPayment.findPersonalAccount(findPersonalAccountDto);
		const dataSource = this.accountRepository.createQueryBuilder();
		await dataSource.update(AccountEntity).set({ utilities: utilities }).where({ name, surname }).execute();

		const returnAccount = await this.accountRepository.findOneBy({ name, surname });
		return {
			name: returnAccount.name,
			surname: returnAccount.surname,
			utilities: utilities.personalAccount,
		};
	}

	public async checkInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetPayment.checkInternetBalance(personalAccount);
	}

	public async payForInternet(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: InternetBalanceDto,
	): Promise<{ balance: number }> {
		await this.withdrawalFromTheBalance(decrementAccountBalanceDto);
		return await this.internetPayment.internetPay(incrementInternetBalanceDto);
	}

	public async checkMobileBalance(phoneNumber: string): Promise<MobileEntity> {
		return await this.mobilePayment.checkMobileBalance(phoneNumber);
	}

	public async replenishMobileAccount(
		decrementAccountBalanceDto: AccountBalanceDto,
		incrementInternetBalanceDto: MobileBalanceDto,
	): Promise<{ balance: number }> {
		await this.withdrawalFromTheBalance(decrementAccountBalanceDto);
		return await this.mobilePayment.replenishMobileAccount(incrementInternetBalanceDto);
	}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesPayment.checkUtilitiesTaxes(personalAccount, type);
	}

	public async payForUtilities(
		decrementAccountBalanceDto: AccountBalanceDto,
		payForTaxes: UtilitiesTaxesDto,
	): Promise<{ personalAccount: number; type: UtilitiesType; message: string }> {
		await this.withdrawalFromTheBalance(decrementAccountBalanceDto);
		return await this.utilitiesPayment.payForUtilities(payForTaxes);
	}
}
