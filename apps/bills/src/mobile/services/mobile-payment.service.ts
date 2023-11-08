import { NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from '../../account/entities/dtos/account-balance.dto';
import { AddPhoneNumberToAccountDto } from '../../account/entities/dtos/add-phone-number-to-account.dto';
import { AddMobileClientDto } from '../entities/dtos/add-mobile-client.dto';
import { MobileBalanceDto } from '../entities/dtos/mobile-balance.dto';
import { MobileEntity } from '../entities/mobile.entity';
import { Payments } from '../../common/interfaces/generics/payments.generic';

export class MobilePaymentService
	implements
		Payments<AddMobileClientDto, MobileEntity, MobileBalanceDto, AddPhoneNumberToAccountDto, string, Balance>
{
	constructor(@InjectRepository(MobileEntity) private readonly mobileRepository: Repository<MobileEntity>) {}

	public async addClient(dto: AddMobileClientDto): Promise<AddMobileClientDto> {
		return await this.mobileRepository.save({ ...dto });
	}

	public async checkBalance(data: string): Promise<MobileEntity> {
		return await this.mobileRepository.findOneBy({ phoneNumber: data });
	}

	public async payForBills(dto: MobileBalanceDto): Promise<Balance> {
		const mobile = await this.mobileRepository.find();
		const findBalance = mobile.find((index) => index.balance);

		if (findBalance.balance < 0 || dto.sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.mobileRepository.createQueryBuilder();
		await dataSource
			.update(MobileEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', dto.sum)
			.where({ phoneNumber: dto.phoneNumber })
			.execute();
		const returnBalance = await this.mobileRepository.findOneBy({ phoneNumber: dto.phoneNumber });
		return {
			balance: returnBalance.balance,
		};
	}

	public async findAccount(dto: AddPhoneNumberToAccountDto): Promise<MobileEntity> {
		return await this.mobileRepository.findOneBy(dto);
	}
}
