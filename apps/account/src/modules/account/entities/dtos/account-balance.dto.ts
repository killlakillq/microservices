import { IsNumber, IsString } from 'class-validator';

export class AccountBalanceDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	sum: number;
}

export type Balance = {
	balance: number;
};
