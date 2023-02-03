import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserResponseDto } from './interfaces/dto/authentication/create-user-response.dto';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { LoginUserResponseDto } from './interfaces/dto/login-user-response.dto';
import { IServiceUserCreateResponse } from './interfaces/service-user-create-response.interface';
import { IServiceUserLoginResponse } from './interfaces/service-user-login-response.interface';

@Controller('auth')
export class AuthController {
	constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

	@Post('register')
	public async register(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
		const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
			this.authClient.send('register-user', dto),
		);
		if (createUserResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: createUserResponse.message,
					data: null,
					errors: createUserResponse.errors,
				},
				createUserResponse.status,
			);
		}

		return {
			message: createUserResponse.message,
			data: {
				user: createUserResponse.user,
			},
			errors: null,
		};
	}

	@Post('login')
	public async login(@Body() { login, password }: CreateUserDto): Promise<LoginUserResponseDto> {
		const loginUserResponse: IServiceUserLoginResponse = await firstValueFrom(
			this.authClient.send('login-user', { login, password }),
		);
		if (loginUserResponse.status !== HttpStatus.ACCEPTED) {
			throw new HttpException(
				{
					message: loginUserResponse.message,
					data: null,
					errors: loginUserResponse.errors,
				},
				loginUserResponse.status,
			);
		}

		return {
			message: loginUserResponse.message,
			data: {
				user: loginUserResponse.user,
			},
			errors: null,
		};
	}
}
