import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from '../interfaces/dto/create-account.dto';
import { AccountEntity } from '../interfaces/entities/account.entity';
import { CardEntity } from '../interfaces/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateAccountWithCardDto } from '../interfaces/dto/create-account-with-card.dto';
import { CreateCardDto } from 'src/interfaces/dto/create-card.dto';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
		@InjectRepository(CardEntity) private readonly cardRepository: Repository<CardEntity>,
	) {}

	public async createAccountWithCard(dto: CreateAccountWithCardDto): Promise<CreateAccountWithCardDto> {
		return await this.accountRepository.save({ ...dto });
	}

	public async createAccount(dto: CreateAccountDto): Promise<CreateAccountDto> {
		return await this.accountRepository.save({ ...dto });
	}

	public async createCard(dto: CreateCardDto): Promise<CreateCardDto> {
		return await this.cardRepository.save({ ...dto });
	}
}
