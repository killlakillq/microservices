import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'Mobile' })
export class MobileEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, width: 10 })
	phoneNumber: number;

	@Column()
	operator: string;

	@Column({ default: 0 })
	balance: number;

	@OneToOne(() => AccountEntity, (account) => account.mobile)
	account: AccountEntity;
}
