import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ServicesResponse, Tokens, Account, RegisterUserDto, LoginUserDto } from '@microservices/models';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
		@Inject('ACCOUNT_SERVICE') private readonly accountClient: ClientProxy,
	) {}

	@Post('sign-up')
	public async registerUser(@Body() dto: RegisterUserDto): Promise<ServicesResponse<Tokens>> {
		const registerUserResponse: ServicesResponse<Tokens> = await firstValueFrom(
			this.authClient.send('register-user', {
				login: dto.login,
				password: dto.password,
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
		const createAccountResponse: ServicesResponse<Account> = await firstValueFrom(
			this.accountClient.send('create-account', {
				name: dto.name,
				surname: dto.surname,
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
			status: registerUserResponse.status,
			message: registerUserResponse.message,
			data: null,
			errors: null,
		};
	}

	@Post('sign-in')
	public async loginUser(@Body() dto: LoginUserDto): Promise<ServicesResponse<Tokens>> {
		const loginUserResponse: ServicesResponse<Tokens> = await firstValueFrom(
			this.authClient.send('login-user', dto),
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
			status: loginUserResponse.status,
			message: loginUserResponse.message,
			data: loginUserResponse.data,
			errors: null,
		};
	}
}
