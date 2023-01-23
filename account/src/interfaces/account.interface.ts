import { ICard } from "./card.interface";
import { ITax } from "./tax.interface";

export interface IAccount {
	balance: number;
	card: ICard;
	tax: ITax;
}