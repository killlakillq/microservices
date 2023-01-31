import { IsNumber } from "class-validator";

export class PayForInternetDto {
	@IsNumber()
	personalAccount: number;

	@IsNumber()
	sum: number;
}