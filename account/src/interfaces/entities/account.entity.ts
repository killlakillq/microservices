import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardEntity } from './card.entity';

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ unique: true })
	login: string;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	balance: number;

	@CreateDateColumn()
	registrationDate: Date;

	@OneToOne(() => CardEntity, (card) => card.account, { cascade: true })
	@JoinColumn()
	card: CardEntity;
}
