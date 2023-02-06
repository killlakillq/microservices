import { IsEmail } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@Column()
	password: string;
}
