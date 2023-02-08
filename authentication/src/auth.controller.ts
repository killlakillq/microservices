import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { UserResponseDto } from './interfaces/dto/user-response.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('register-user')
	public async registerUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
		try {
			await this.authService.registerUser(createUserDto);
			return {
				status: 201,
				message: 'account was successfully registered.',
				data: null,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong.',
				data: null,
				errors: error,
			};
		}
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('login-user')
	public async loginUser({ login, password }: CreateUserDto): Promise<UserResponseDto> {
		try {
			const { email } = await this.authService.validate(login, password);
			const tokens = await this.authService.loginUser(email);

			return {
				status: 202,
				message: 'user was successfully logged.',
				data: tokens,
				errors: null,
			};
		} catch (error) {
			return {
				status: 403,
				message: 'oops, something went wrong',
				data: null,
				errors: error,
			};
		}
	}
}
