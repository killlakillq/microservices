import { IsNumber, IsString } from 'class-validator';

export class AddMobileClientDto {
	@IsString()
	phoneNumber: string;

	@IsString()
	operator: string;

	@IsNumber()
	balance: number;
}
