import { UtilitiesEntity } from './entities/utilities.entity';
import { UtilitiesType } from './enums/utilities-type.enum';

export interface Utilities {
	checkUtilitiesTaxes: (personalAccount: number, type: UtilitiesType) => Promise<UtilitiesEntity>;
	payForUtilities: (personalAccount: number, type: UtilitiesType, sum: number) => Promise<UtilitiesEntity>;
}
