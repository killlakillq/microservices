import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { InternetEntity } from './internet.entity';
import { MobileEntity } from './mobile.entity';
import { UtilitiesEntity } from './utilities.entity';

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	surname: string;

	@Column()
	balance: number;

	@OneToOne(() => InternetEntity, (internet) => internet.personalAccount)
	@JoinColumn()
	internetPersonalAccount: InternetEntity;

	@OneToOne(() => UtilitiesEntity, (utilities) => utilities.personalAccount)
	@JoinColumn()
	utilitiesPersonalAccount: UtilitiesEntity;

	@OneToOne(() => MobileEntity, (mobile) => mobile.phoneNumber)
	@JoinColumn()
	phoneNumber: MobileEntity;
}
