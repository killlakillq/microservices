import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Utilities' })
export class UtilitiesEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	personalAccount: number;

	@Column()
	nameSurname: string;

	@Column()
	address: string;

	@Column()
	sum: string;
}
