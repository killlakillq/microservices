import { IsString, IsEmail } from "@nestjs/class-validator";

export class CreateUserDto {
	@IsString()
	@IsEmail()
	login: string;

	@IsString()
	password: string;
}
