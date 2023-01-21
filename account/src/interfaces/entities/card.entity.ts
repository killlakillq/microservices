import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./account.entity";

@Entity({ name: 'Card' })
export class CardEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false, length: 16 })
	number: string;

	@Column({ unique: true, nullable: false, length: 3 })
	cvc: string;

	@Column({ nullable: false, length: 5 })
	expirationDate: string;

	@OneToOne(() => AccountEntity, (account) => account.card)
	account: AccountEntity;
}