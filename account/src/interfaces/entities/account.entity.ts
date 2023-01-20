import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';
import { CardEntity } from './card.entity';

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	login: string;

	@Column()
	name: string;

	@CreateDateColumn()
	registrationDate: Date;

	@Column()
	address: string;

	@OneToOne(() => CardEntity, (card) => card.account)
	@JoinColumn()
	card: CardEntity;
}
