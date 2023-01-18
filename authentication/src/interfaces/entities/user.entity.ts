import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@Column()
	email: string;

	@Column()
	password: string;
}
