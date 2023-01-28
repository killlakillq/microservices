import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternetEntity } from '../interfaces/entities/internet.entity';
import { MobileEntity } from '../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from '../interfaces/entities/utilities.entity';
import { UtilitiesType } from '../interfaces/enums/utilities-type.enum';
import { Internet } from '../interfaces/internet.interface';
import { Mobile } from '../interfaces/mobile.interface';
import { Utilities } from '../interfaces/utilities.interface';

export class InternetPayment implements Internet {
	constructor(@InjectRepository(InternetEntity) private readonly internetRepository: Repository<InternetEntity>) {}

	public async checkInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ personalAccount });
	}

	public async internetPay(sum: number): Promise<InternetEntity> {
		const dataSource = this.internetRepository.createQueryBuilder();
		const updatedBalance = await dataSource
			.insert()
			.into(InternetEntity)
			.values([
				{
					balance: sum,
				},
			])
			.execute();
		return await updatedBalance.raw();
	}
}

export class MobilePayment implements Mobile {
	constructor(@InjectRepository(MobileEntity) private readonly mobileRepository: Repository<MobileEntity>) {}

	public async checkMobileBalance(phoneNumber: number): Promise<MobileEntity> {
		return await this.mobileRepository.findOneBy({ phoneNumber });
	}

	public async topUpTheAccount(sum: number): Promise<MobileEntity> {
		const dataSource = this.mobileRepository.createQueryBuilder();
		const updatedBalance = await dataSource
			.insert()
			.into(MobileEntity)
			.values([
				{
					balance: sum,
				},
			])
			.execute();
		return await updatedBalance.raw();
	}
}

export class UtilitiesPayment implements Utilities {
	constructor(
		@InjectRepository(UtilitiesEntity) private readonly utilitiesRepository: Repository<UtilitiesEntity>,
	) {}

	public async checkUtilitiesTaxes(personalAccount: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesRepository.findOneBy({ personalAccount, type });
	}

	public async payForUtilities(personalAccount: number, type: UtilitiesType, sum: number): Promise<UtilitiesEntity> {
		const dataSource = this.utilitiesRepository.createQueryBuilder();
		const updatedTax = await dataSource
			.delete()
			.from(UtilitiesEntity)
			.where(['pesonalAccount = :personalAccount', 'type = :type', 'sum = :sum'], {
				personalAccount: personalAccount,
				type: type,
				sum: sum,
			})
			.execute();
		return await updatedTax.raw();
	}
}
