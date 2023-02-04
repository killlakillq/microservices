import { IsNumber, IsString } from 'class-validator';

export class AddInternetClientDto {
	@IsNumber()
	personalAccount: number;

	@IsNumber()
	balance: number;

	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsString()
	address: string;
}
