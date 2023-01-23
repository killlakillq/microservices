import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { cardType, paymentMethod } from '../enums/card.enum';
import { AccountEntity } from './account.entity';

@Entity()
export class CardEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	number: string;

	@Column()
	type: cardType;

	@Column()
	payment: paymentMethod;

	@OneToOne(() => AccountEntity, (account) => account.card)
	account: AccountEntity;
}
