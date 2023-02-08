import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from './interfaces/dto/authentication/create-user.dto';
import { UserResponseDto } from './interfaces/dto/authentication/user-response.dto';
import { ServiceAuthenticationResponse } from './interfaces/responses/service-authentication-response.interface';

@Controller('auth')
export class AuthController {
	constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

	@Post('signup')
	public async registerUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
		const createUserResponse: ServiceAuthenticationResponse = await firstValueFrom(
			this.authClient.send('register-user', createUserDto),
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
				user: createUserResponse.user, // empty object
			},
			errors: null,
		};
	}

	@Post('signin')
	public async loginUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
		const loginUserResponse: ServiceAuthenticationResponse = await firstValueFrom(
			this.authClient.send('login-user', createUserDto),
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
				user: loginUserResponse.user, // empty object
			},
			errors: null,
		};
	}
}
