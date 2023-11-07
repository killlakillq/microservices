import { NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddPersonalAccountDto } from '../../interfaces/dto/account/add-personal-account.dto';
import { AddInternetClientDto } from '../../interfaces/dto/internet/add-internet-client.dto';
import { InternetBalanceDto } from '../../interfaces/dto/internet/internet-balance.dto';
import { InternetEntity } from '../../interfaces/entities/internet.entity';
import { Payments, Balance } from '../../interfaces/generics/payments.interface';

export class InternetPaymentService
	implements
		Payments<AddInternetClientDto, InternetEntity, InternetBalanceDto, AddPersonalAccountDto, number, Balance>
{
	constructor(@InjectRepository(InternetEntity) private readonly internetRepository: Repository<InternetEntity>) {}

	public async addClient(addInternetClientDto: AddInternetClientDto): Promise<AddInternetClientDto> {
		return await this.internetRepository.save({ ...addInternetClientDto });
	}

	public async checkBalance(data: number): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ personalAccount: data });
	}

	public async payForBills(dto: InternetBalanceDto): Promise<Balance> {
		const internet = await this.internetRepository.find();
		const findBalance = internet.find((index) => index.balance);

		if (findBalance.balance < 0 || dto.sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.internetRepository.createQueryBuilder();
		await dataSource
			.update(InternetEntity)
			.set({ balance: () => 'balance + :sum' })
			.setParameter('sum', dto.sum)
			.where({ personalAccount: dto.personalAccount })
			.execute();
		const returnBalance = await this.internetRepository.findOneBy({ personalAccount: dto.personalAccount });
		return {
			balance: returnBalance.balance,
		};
	}

	public async findAccount({ name, surname, personalAccount }: AddPersonalAccountDto): Promise<InternetEntity> {
		return await this.internetRepository.findOneBy({ name, surname, personalAccount });
	}
}
