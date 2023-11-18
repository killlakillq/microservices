import {
	Payments,
	AddInternetClientDto,
	InternetEntity,
	InternetBalanceDto,
	AddPersonalAccountDto,
	Balance,
} from '@microservices/models';
import { NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
