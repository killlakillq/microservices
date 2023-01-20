import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'Card' })
export class CardEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ unique: true, length: 16 })
	number: string;

	@Column()
	expirationDate: string;

	@Column({ unique: true })
	cvc: string;

	@OneToOne(() => AccountEntity, (account) => account.card)
	@JoinColumn()
	account: AccountEntity;
}
