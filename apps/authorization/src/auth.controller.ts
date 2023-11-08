import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './common/interfaces/entities/dtos/create-user.dto';
import { UserResponseDto } from './common/interfaces/entities/dtos/user-response.dto';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly tokenService: TokenService, private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@MessagePattern('register-user')
	public async registerUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
		await this.authService.registerUser(createUserDto);
		return {
			status: 201,
			message: 'account was successfully registered.',
			data: null,
			errors: null,
		};
	}

	@UsePipes(new ValidationPipe())
	@MessagePattern('login-user')
	public async loginUser({ login, password }: CreateUserDto): Promise<UserResponseDto> {
		const { email } = await this.authService.validate(login, password);
		const tokens = await this.authService.loginUser(email);

		return {
			status: 202,
			message: 'user was successfully logged.',
			data: tokens,
			errors: null,
		};
	}

	@MessagePattern('verify-token')
	public async verifyToken(token: string): Promise<UserResponseDto> {
		const verify = await this.tokenService.verifyToken(token);
		return {
			status: 202,
			message: 'your token was veryfied.',
			data: verify,
			errors: null,
		};
	}
}
