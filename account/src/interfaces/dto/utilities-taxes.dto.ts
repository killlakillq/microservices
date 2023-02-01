import { IsEnum, IsNumber } from 'class-validator';
import { UtilitiesType } from '../enums/utilities-type.enum';

export class UtilitiesTaxesDto {
	@IsNumber()
	personalAccount: number;

	@IsEnum(UtilitiesType)
	type: UtilitiesType;

	@IsNumber()
	sum: number;
}
