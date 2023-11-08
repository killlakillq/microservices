import { IsNumber } from "class-validator";

export class InternetBalanceDto {
	@IsNumber()
	personalAccount: number;

	@IsNumber()
	sum: number;
}