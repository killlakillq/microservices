import { IsEnum, IsNumber } from 'class-validator';
import { UtilitiesType } from 'interfaces/enums/utilities-type.enum';

export class UtilitiesTaxesDto {
	@IsNumber()
	personalAccount: number;

	@IsEnum(UtilitiesType)
	type: UtilitiesType;

	@IsNumber()
	sum: number;
}

export type UtilitiesBills = { personalAccount: number; type: UtilitiesType; message: string };
