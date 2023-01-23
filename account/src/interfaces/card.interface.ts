import { cardType, paymentMethod } from './enums/card.enum';

export interface ICard {
	number: string;
	type: cardType;
	payment: paymentMethod;
}
