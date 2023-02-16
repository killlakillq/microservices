import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../interfaces/dto/create-user.dto';
import { UserEntity } from '../interfaces/entities/user.entity';
import { CryptoConfigService } from './config/crypto-config.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly cryptoConfigService: CryptoConfigService,
		private readonly tokenService: TokenService,
	) {}

	public async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const encrypted = this.cryptoConfigService.encrypt(createUserDto.password);

		const newUser = {
			email: createUserDto.login,
			password: encrypted,
		};
		return await this.userRepository.save(newUser);
	}

	public async validate(email: string, password: string): Promise<Pick<UserEntity, 'email'>> {
		const user = await this.userRepository.findOneBy({ email });
		if (!user) {
			throw new NotFoundException();
		}
		const decrypted = this.cryptoConfigService.decrypt(password);
		if (decrypted !== password) {
			throw new UnauthorizedException();
		}
		return { email: user.email };
	}

	public async loginUser(email: string): Promise<{ accessToken: unknown; refreshToken: unknown }> {
		const id = await this.userRepository.findOneBy({ email });
		await this.tokenService.saveTokens(id.id, email);
		return await this.tokenService.getTokens(email);
	}
}
