import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UtilitiesType } from '../../../../common/interfaces/enums/utilities-type.enum';

export class AddTaxDto {
	@IsNumber()
	personalAccount: number;

	@IsEnum(UtilitiesType)
	type: UtilitiesType;

	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	sum: number;

	@IsString()
	address: string;
}
