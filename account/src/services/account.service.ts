import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { InternetEntity } from './../interfaces/entities/internet.entity';
import { MobileEntity } from './../interfaces/entities/mobile.entity';
import { UtilitiesEntity } from './../interfaces/entities/utilities.entity';
import { Internet } from './../interfaces/internet.interface';
import { Mobile } from './../interfaces/mobile.interface';
import { Utilities } from './../interfaces/utilities.interface';


export class InternetPayment implements Internet {
	constructor(@InjectRepository(InternetEntity) private readonly internetRepository: Repository<InternetEntity>) {}
	
	public async getInternetBalance(personalAccount: number): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ personalAccount });
	}

	public async internetPay(sum: number): Promise<InternetEntity> {
		const dataSource = this.internetRepository.createQueryBuilder();
		const updatedBalance = await dataSource.insert().into(InternetEntity).values([{
			balance: sum,
		}]).execute();
		return await updatedBalance.raw();
	}
}

export class MobilePayment implements Mobile {
	constructor(@InjectRepository(MobileEntity) private readonly mobileRepository: Repository<MobileEntity>) {}
}

export class UtilitiesPayment implements Utilities {
	constructor(
		@InjectRepository(UtilitiesEntity) private readonly utilitiesRepository: Repository<UtilitiesEntity>,
	) {}
}
// todo: remove classes in other module and will write account service by these classes here