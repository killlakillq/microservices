import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from '../interfaces/dto/create-account.dto';
import { CreateCardDto } from '../interfaces/dto/create-card.dto';
import { AccountEntity } from '../interfaces/entities/account.entity';
import { CardEntity } from '../interfaces/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private readonly accoutRepository: Repository<AccountEntity>,
		@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>,
	) {}

	public async createCard(dto: CreateCardDto): Promise<CreateCardDto> {
		return await this.cardRepository.save({ ...dto });
	}

	public async createAccount(dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accoutRepository.save({ ...dto });
	}

	public async getAcc() {
		return await this.accoutRepository.find();

	}

	public async getCard() {
		return await this.cardRepository.find();
	}
}
