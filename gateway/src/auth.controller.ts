import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterUserDto } from './interfaces/dto/authentication/register-user.dto';
import { AuthResponseDto } from './interfaces/dto/authentication/auth-user-respose.dto';
import { ServiceAccountResponse } from './interfaces/responses/service-account-response.interface';
import { ServiceAuthenticationResponse } from './interfaces/responses/service-authentication-response.interface';
import { LoginUserDto } from './interfaces/dto/authentication/login-user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
		@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
	) {}

	@Post('signup')
	public async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
		const registerUserResponse: ServiceAuthenticationResponse = await firstValueFrom(
			this.authClient.send('register-user', {
				login: registerUserDto.login,
				password: registerUserDto.password,
			}),
		);
		if (registerUserResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: registerUserResponse.message,
					data: null,
					errors: registerUserResponse.errors,
				},
				registerUserResponse.status,
			);
		}
		const createAccountResponse: ServiceAccountResponse = await firstValueFrom(
			this.accountClient.send('create-account', {
				name: registerUserDto.name,
				surname: registerUserDto.surname,
			}),
		);
		if (createAccountResponse.status !== HttpStatus.CREATED) {
			throw new HttpException(
				{
					message: createAccountResponse.message,
					data: null,
					errors: createAccountResponse.errors,
				},
				createAccountResponse.status,
			);
		}
		return {
			message: registerUserResponse.message,
			data: null,
			errors: null,
		};
	}

	@Post('signin')
	public async loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
		const loginUserResponse: ServiceAuthenticationResponse = await firstValueFrom(
			this.authClient.send('login-user', loginUserDto),
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
				tokens: loginUserResponse.data,
			},
			errors: null,
		};
	}
}
