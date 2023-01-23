import { IsNumber, IsObject } from 'class-validator';
import { cardType, paymentMethod } from '../enums/card.enum';

export class CreateAccountDto {
	@IsNumber()
	balance: number;

	@IsObject()
	card: {
		number: string;
		type: cardType;
		payment: paymentMethod;
	};
}
