import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../../libs/models/entities/user.entity';
import { TokenService } from './token.service';
import { CreateUserDto, Tokens } from '@microservices/models';
import { Crypto } from '@microservices/crypto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly crypto: Crypto,
		private readonly tokenService: TokenService,
	) {}

	public async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const encrypted = this.crypto.encrypt(createUserDto.password);

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
		const decrypted = this.crypto.decrypt(password);
		if (decrypted !== password) {
			throw new UnauthorizedException();
		}
		return { email: user.email };
	}

	public async loginUser(email: string): Promise<Tokens> {
		const id = await this.userRepository.findOneBy({ email });
		await this.tokenService.saveTokens(id.id, email);
		return await this.tokenService.getTokens();
	}
}
