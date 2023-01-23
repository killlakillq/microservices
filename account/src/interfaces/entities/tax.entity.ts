import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { taxType } from '../enums/tax.enum';

@Entity()
export class TaxEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	type: taxType;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	sum: number;

	@OneToOne(() => AccountEntity, (account) => account.taxes)
	account: AccountEntity;
}
