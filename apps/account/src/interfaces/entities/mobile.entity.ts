import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'Mobile' })
export class MobileEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	surname: string;

	@Column({ unique: true, length: 10 })
	phoneNumber: string;

	@Column()
	operator: string;

	@Column({ default: 0 })
	balance: number;

	@OneToOne(() => AccountEntity, (account) => account.mobile)
	account: AccountEntity;
}
