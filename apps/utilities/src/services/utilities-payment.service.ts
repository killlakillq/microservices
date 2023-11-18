import { NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTaxDto } from '../entities/dtos/add-tax.dto';
import { UtilitiesTaxesDto, UtilitiesBills } from '../entities/dtos/utilities-taxes.dto';
import { UtilitiesEntity } from '../entities/utilities.entity';

export class UtilitiesPaymentService
	implements Payments<AddTaxDto, UtilitiesEntity, UtilitiesTaxesDto, AddPersonalAccountDto, number, UtilitiesBills>
{
	constructor(
		@InjectRepository(UtilitiesEntity) private readonly utilitiesRepository: Repository<UtilitiesEntity>,
	) {}

	public async addClient(dto: AddTaxDto): Promise<AddTaxDto> {
		return await this.utilitiesRepository.save({ ...dto });
	}

	public async checkBalance(data: number, type: UtilitiesType): Promise<UtilitiesEntity> {
		return await this.utilitiesRepository.findOneBy({ personalAccount: data, type });
	}

	public async payForBills(dto: UtilitiesTaxesDto): Promise<UtilitiesBills> {
		const utilities = await this.utilitiesRepository.find();
		const findBalance = utilities.find((index) => index.sum);

		if (findBalance.sum > dto.sum || dto.sum < 0) {
			throw new NotAcceptableException();
		}

		const dataSource = this.utilitiesRepository.createQueryBuilder();
		await dataSource
			.delete()
			.from(UtilitiesEntity)
			.where(['pesonalAccount = :personalAccount', 'type = :type', 'sum = :sum'], {
				personalAccount: dto.personalAccount,
				type: dto.type,
				sum: dto.sum,
			})
			.execute();
		return {
			type: dto.type,
			personalAccount: dto.personalAccount,
			message: `${dto.type} was successfully paid.`,
		};
	}

	public async findAccount(dto: AddPersonalAccountDto): Promise<UtilitiesEntity> {
		return await this.utilitiesRepository.findOneBy(dto);
	}
}
