import { IsNumber, IsString, IsObject } from '@nestjs/class-validator';

export class CreateAccountWithCardDto {
	@IsString()
	login: string;

	@IsString()
	name: string;

	@IsString()
	address: string;

	@IsNumber()
	balance: number;

	@IsObject()
	card: {
		number: string;
		cvc: string;
		expirationDate: string;
	};
}
