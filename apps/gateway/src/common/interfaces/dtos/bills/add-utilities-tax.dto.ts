import { UtilitiesType } from '../../enums/utilities-type.enum';

export class AddTaxDto {
	personalAccount: number;
	type: UtilitiesType;
	name: string;
	surname: string;
	sum: number;
	address: string;
}
