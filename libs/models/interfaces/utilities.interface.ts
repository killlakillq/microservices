import { UtilitiesType } from './enums/utilities-type.enum';

export interface Utilities {
	id: string;
	personalAccount: number;
	type: UtilitiesType;
	name: string;
	surname: string;
	sum: number;
	address: string;
}
