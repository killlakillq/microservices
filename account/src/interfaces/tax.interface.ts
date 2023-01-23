import { taxType } from "./enums/tax.enum";

export interface ITax {
	type: taxType;
	name: string;
	address: string;
	sum: number;
}