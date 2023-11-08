import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { InternetEntity } from '../../internet/entities/internet.entity';
import { MobileEntity } from '../../mobile/entities/mobile.entity';
import { UtilitiesEntity } from '../../utilities/entities/utilities.entity';

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	surname: string;

	@Column({ nullable: true, default: 0 })
	balance: number;

	@OneToOne(() => InternetEntity, (internet) => internet.personalAccount)
	@JoinColumn()
	internet: InternetEntity;

	@OneToOne(() => UtilitiesEntity, (utilities) => utilities.personalAccount)
	@JoinColumn()
	utilities: UtilitiesEntity;

	@OneToOne(() => MobileEntity, (mobile) => mobile.phoneNumber)
	@JoinColumn()
	mobile: MobileEntity;
}
