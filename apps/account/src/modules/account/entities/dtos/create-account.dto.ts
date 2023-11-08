import { IsString } from 'class-validator';

export class CreateAccountDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;
}

