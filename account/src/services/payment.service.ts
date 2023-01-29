import { InjectRepository } from '@nestjs/typeorm';
import { AddInternetClientDto } from 'src/interfaces/dto/add-internet-client.dto';
import { AddMobileClientDto } from 'src/interfaces/dto/add-mobile-client.dto';
import { AddTaxDto } from 'src/interfaces/dto/add-tax.dto';
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

	public async addInternetClient(dto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetRepository.save({ ...dto });
	}

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

	public async addMobileClient(dto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobileRepository.save({ ...dto });
	}

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

	public async addTax(dto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesRepository.save({ ...dto });
	}

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
