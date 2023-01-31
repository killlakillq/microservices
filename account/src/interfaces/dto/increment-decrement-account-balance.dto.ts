import { IsNumber, IsString } from 'class-validator';

export class IncrementOrDecrementAccountBalanceDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	sum: number;
}
