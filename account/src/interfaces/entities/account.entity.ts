import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "./card.entity";
import { TaxEntity } from './tax.entity';

@Entity()
export class AccountEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ default: 0 })
	balance: number;

	@OneToOne(() => CardEntity, (card) => card.account)
	@JoinColumn()
	card: CardEntity;

	@OneToOne(() => TaxEntity, (tax) => tax.account)
	@JoinColumn()
	taxes: TaxEntity;
}