import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../interfaces/dto/create-user.dto';
import { UserEntity } from '../interfaces/entities/user.entity';
import { CryptoConfigService } from './config/crypto-config.service';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
		private readonly cryptoConfigService: CryptoConfigService,
		private readonly configService: ConfigService,
	) {}

	public async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {

		const encrypted  = this.cryptoConfigService.encrypt(createUserDto.password);

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
		return { email: user.email }
	}

	public async getTokens(email: string): Promise<{ accessToken: string; refreshToken: string }> {
		const id = await this.userRepository.findOneBy({ email });
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync({ id: id.id, email }, { secret: this.configService.get('JWT_ACCESS_SECRET'), expiresIn: '15m' }),
			this.jwtService.signAsync({ id: id.id, email }, { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '7d' }),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}
}
