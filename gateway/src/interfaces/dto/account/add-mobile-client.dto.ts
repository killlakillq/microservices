import { IsNumber, IsString } from 'class-validator';

export class AddMobileClientDto {
	@IsNumber()
	phoneNumber: string;

	@IsString()
	operator: string;

	@IsNumber()
	balance: number;
}
