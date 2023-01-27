import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { UtilitiesType } from '../enums/utilities-type.enum';

@Entity({ name: 'Utilities' })
export class UtilitiesEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	personalAccount: number;

	@Column({ nullable: false })
	type: UtilitiesType;

	@Column({ nullable: false })
	nameSurname: string;

	@Column({ default: 0 })
	sum: number;

	@Column({ nullable: false })
	address: string;
}
