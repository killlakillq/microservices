import { IsNumber } from "class-validator";

export class MobileBalanceDto {
	@IsNumber()
	phoneNumber: string;

	@IsNumber()
	sum: number;
}