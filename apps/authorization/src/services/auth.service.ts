import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../common/interfaces/entities/dtos/create-user.dto';
import { UserEntity } from '../common/interfaces/entities/user.entity';
import { CryptoHelper } from '../helpers/crypto.helper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly cryptoHelper: CryptoHelper,
		private readonly tokenService: TokenService,
	) {}

	public async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const encrypted = this.cryptoHelper.encrypt(createUserDto.password);

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
		const decrypted = this.cryptoHelper.decrypt(password);
		if (decrypted !== password) {
			throw new UnauthorizedException();
		}
		return { email: user.email };
	}

	public async loginUser(email: string): Promise<{ accessToken: unknown; refreshToken: unknown }> {
		const id = await this.userRepository.findOneBy({ email });
		await this.tokenService.saveTokens(id.id, email);
		return await this.tokenService.getTokens();
	}
}
