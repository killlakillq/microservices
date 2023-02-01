import { IsNumber } from "class-validator";

export class MobileBalanceDto {
	@IsNumber()
	phoneNumber: number;

	@IsNumber()
	sum: number;
}