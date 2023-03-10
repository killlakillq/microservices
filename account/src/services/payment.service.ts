import { InjectRepository } from '@nestjs/typeorm';
import { AddInternetClientDto } from '../interfaces/dto/internet/add-internet-client.dto';
import { AddMobileClientDto } from '../interfaces/dto/mobile/add-mobile-client.dto';
import { Repository } from 'typeorm';
import { MobileEntity } from '../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from '../interfaces/entities/utilities.entity';
import { UtilitiesType } from '../interfaces/enums/utilities-type.enum';
import { Internet } from '../interfaces/internet.interface';
import { Mobile } from '../interfaces/mobile.interface';
import { Utilities } from '../interfaces/utilities.interface';
import { AddTaxDto } from '../interfaces/dto/utilities/add-tax.dto';
import { InternetEntity } from '../interfaces/entities/internet.entity';
import { InternetBalanceDto } from '../interfaces/dto/internet/internet-balance.dto';
import { NotAcceptableException } from '@nestjs/common';
import { MobileBalanceDto } from '../interfaces/dto/mobile/mobile-balance.dto';
import { UtilitiesTaxesDto } from '../interfaces/dto/utilities/utilities-taxes.dto';
import { AddPhoneNumberToAccountDto } from '../interfaces/dto/account/add-phone-number-to-account.dto';
import { AddPersonalAccountDto } from '../interfaces/dto/account/add-personal-account.dto';

export class InternetPayment implements Internet {
	constructor(@InjectRepository(InternetEntity) private readonly internetRepository: Repository<InternetEntity>) {}

	public async addInternetClient(addInternetClientDto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetRepository.save({ ...addInternetClientDto });
	}

	public async checkInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ personalAccount });
	}

	public async internetPay({ personalAccount, sum }: InternetBalanceDto): Promise<{ balance: number }> {
		const internet = await this.internetRepository.find();
		const findBalance = internet.find((index) => index.balance);

		if (findBalance.balance < 0 || sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.internetRepository.createQueryBuilder();
		await dataSource
			.update(InternetEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', sum)
			.where({ personalAccount })
			.execute();
		const returnBalance = await this.internetRepository.findOneBy({ personalAccount });
		return {
			balance: returnBalance.balance,
		};
	}

	public async findPersonalAccount({
		name,
		surname,
		personalAccount,
	}: AddPersonalAccountDto): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ name, surname, personalAccount });
	}
}

export class MobilePayment implements Mobile {
	constructor(@InjectRepository(MobileEntity) private readonly mobileRepository: Repository<MobileEntity>) {}

	public async addMobileClient(addMobileClientDto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobileRepository.save({ ...addMobileClientDto });
	}

	public async checkMobileBalance(phoneNumber: string): Promise<MobileEntity> {
		return await this.mobileRepository.findOneBy({ phoneNumber });
	}

	public async replenishMobileAccount({ phoneNumber, sum }: MobileBalanceDto): Promise<{ balance: number }> {
		const mobile = await this.mobileRepository.find();
		const findBalance = mobile.find((index) => index.balance);

		if (findBalance.balance < 0 || sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.mobileRepository.createQueryBuilder();
		await dataSource
			.update(MobileEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', sum)
			.where({ phoneNumber })
			.execute();
		const returnBalance = await this.mobileRepository.findOneBy({ phoneNumber });
		return {
			balance: returnBalance.balance,
		};
	}

	public async findPhoneNumber({
		name,
		surname,
		phoneNumber,
		operator,
	}: AddPhoneNumberToAccountDto): Promise<MobileEntity> {
		return await this.mobileRepository.findOneBy({ name, surname, phoneNumber, operator });
	}
}

export class UtilitiesPayment implements Utilities {
	constructor(
		@InjectRepository(UtilitiesEntity) private readonly utilitiesRepository: Repository<UtilitiesEntity>,
	) {}

	public async addTax(addTaxDto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesRepository.save({ ...addTaxDto });
	}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesRepository.findOneBy({ personalAccount, type });
	}

	public async payForUtilities({
		personalAccount,
		type,
		sum,
	}: UtilitiesTaxesDto): Promise<{ personalAccount: number; type: UtilitiesType; message: string }> {
		const utilities = await this.utilitiesRepository.find();
		const findBalance = utilities.find((index) => index.sum);

		if (findBalance.sum > sum || sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.utilitiesRepository.createQueryBuilder();
		await dataSource
			.delete()
			.from(UtilitiesEntity)
			.where(['pesonalAccount = :personalAccount', 'type = :type', 'sum = :sum'], {
				personalAccount: personalAccount,
				type: type,
				sum: sum,
			})
			.execute();
		return {
			type: type,
			personalAccount: personalAccount,
			message: `${type} was successfully paid.`,
		};
	}

	public async findPersonalAccount({
		name,
		surname,
		personalAccount,
	}: AddPersonalAccountDto): Promise<UtilitiesEntity> {
		return await this.utilitiesRepository.findOneBy({ name, surname, personalAccount });
	}
}
