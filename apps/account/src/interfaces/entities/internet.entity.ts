import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'Internet' })
export class InternetEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, width: 10 })
	personalAccount: number;

	@Column({ default: 0 })
	balance: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	surname: string;

	@Column()
	address: string;
	
	@OneToOne(() => AccountEntity, (account) => account.internet)
	account: AccountEntity; 
}
