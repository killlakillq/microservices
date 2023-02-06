import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	@IsString()
	login: string;
	
	@IsString()
	password: string;
}
