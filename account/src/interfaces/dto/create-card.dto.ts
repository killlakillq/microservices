import { IsEmail, IsObject, IsString } from '@nestjs/class-validator';

export class CreateCardDto {
	@IsString()
	number: string;

	@IsString()
	cvc: string;
	
	@IsString()
	expirationDate: string;
}
