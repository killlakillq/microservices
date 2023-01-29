import { IsNumber, IsString } from 'class-validator';

export class AddMobileClientDto {
	@IsNumber()
	phoneNumber: number;

	@IsString()
	operator: string;

	@IsNumber()
	balance: number;
}
