import { IsString, IsEmail, IsObject } from "@nestjs/class-validator";

export class CreateAccountDto {
	@IsEmail()
	@IsString()
	login: string;

	@IsString()
	name: string;

	// @IsObject()
	card: {
		number: string;
		cvc: string;
		expirationDate: string;
	};
}