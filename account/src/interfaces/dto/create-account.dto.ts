import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { InternetEntity } from '../entities/internet.entity';
import { MobileEntity } from '../entities/mobile.entity';
import { UtilitiesEntity } from '../entities/utilities.entity';

export class CreateAccountDto {
	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsNumber()
	balance: number;

	@IsOptional()
	@IsObject()
	internetPersonalAccount?: InternetEntity;

	@IsOptional()
	@IsObject()
	utilitiesPersonalAccount?: UtilitiesEntity;

	@IsOptional()
	@IsObject()
	phoneNumber?: MobileEntity;
}

