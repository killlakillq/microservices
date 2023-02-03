import { AddPersonalAccountDto } from './dto/account/add-personal-account.dto';
import { AddTaxDto } from './dto/utilities/add-tax.dto';
import { UtilitiesTaxesDto } from './dto/utilities/utilities-taxes.dto';
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
	findPersonalAccount: ({ name, surname, personalAccount }: AddPersonalAccountDto) => Promise<UtilitiesEntity>;
}
