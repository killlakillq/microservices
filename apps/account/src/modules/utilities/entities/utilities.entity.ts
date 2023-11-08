import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, OneToOne } from 'typeorm';
import { UtilitiesType } from '../../../common/interfaces/enums/utilities-type.enum';
import { AccountEntity } from '../../account/entities/account.entity';

@Entity({ name: 'Utilities' })
export class UtilitiesEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, width: 10 })
	personalAccount: number;

	@Column({ nullable: false })
	type: UtilitiesType;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false })
	surname: string;

	@Column({ default: 0 })
	sum: number;

	@Column({ nullable: false })
	address: string;

	@OneToOne(() => AccountEntity, (account) => account.utilities)
	account: AccountEntity;
}
