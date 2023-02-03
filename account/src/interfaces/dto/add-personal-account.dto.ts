import { IsNumber, IsString } from "class-validator";

export class AddPersonalAccountDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	personalAccount: number;
}