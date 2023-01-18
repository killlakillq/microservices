import { Controller, UnauthorizedException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './interfaces/dto/create-user.dto';
import { UserEntity } from './interfaces/entities/user.entity';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern('register-user')
	public async register(dto: CreateUserDto): Promise<UserEntity> {
		const user = await this.authService.findUser(dto.login);
		if (user) {
			throw new UnauthorizedException();
		}
		return await this.authService.createUser(dto);
	}

	@MessagePattern('login-user')
	public async login({ login, password }: CreateUserDto) {
		const { email } = await this.authService.validateUser(login, password);
		return await this.authService.login(email);
	}
}
