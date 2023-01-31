import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	balance: number;

	@IsOptional()
	@IsNumber()
	internetPersonalAccount?: number;

	@IsOptional()
	@IsNumber()
	utilitiesPersonalAccount?: number;

	@IsOptional()
	@IsNumber()
	phoneNumber?: number;
}

