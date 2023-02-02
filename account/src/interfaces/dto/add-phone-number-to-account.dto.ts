import { IsString } from "class-validator";

export class AddPhoneNumberToAccountDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsString()
	phoneNumber: string;

	@IsString()
	operator: string;
}