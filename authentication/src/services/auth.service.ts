import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../interfaces/dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from '../interfaces/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) 
	{}

	public async createUser(dto: CreateUserDto): Promise<UserEntity> {
		const salt = await genSalt(10);
		const newUser = {
			email: dto.login,
			password: await hash(dto.password, salt),
		};

		return this.userRepository.save(newUser);
	}

	public async findUser(email: string): Promise<UserEntity> {
		return await this.userRepository.findOneBy({ email });
	}

	public async validateUser(email: string, password: string): Promise<Pick<UserEntity, 'email'>> {
		const user = await this.findUser(email);
		if (!user) {
			throw new NotFoundException();
		}
		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}
		return { email: user.email };
	}

	public async login(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
