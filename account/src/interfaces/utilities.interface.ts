import { AddTaxDto } from './dto/add-tax.dto';
import { UtilitiesTaxesDto } from './dto/utilities-taxes.dto';
import { UtilitiesEntity } from './entities/utilities.entity';
import { UtilitiesType } from './enums/utilities-type.enum';

export interface Utilities {
	addTax: (dto: AddTaxDto) => Promise<AddTaxDto>;
	checkUtilitiesTaxes: (personalAccount: number, type: UtilitiesType) => Promise<UtilitiesEntity>;
	payForUtilities: ({
		personalAccount,
		type,
		sum,
	}: UtilitiesTaxesDto) => Promise<{ personalAccount: number; type: UtilitiesType; message: string }>;
}
