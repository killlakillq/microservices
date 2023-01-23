import { IsEnum, IsString } from 'class-validator';
import { CardEntity } from '../entities/card.entity';
import { cardType, paymentMethod } from '../enums/card.enum';

export class CreateCardDto {
	@IsString()
	number: string;

	@IsEnum(CardEntity)
	type: cardType;

	@IsEnum(CardEntity)
	payment: paymentMethod;
}
