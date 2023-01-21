import { IsString, IsNumber } from '@nestjs/class-validator';

export class CreateAccountDto  {
	@IsString()
	login: string;

	@IsString()
	name: string;
}
