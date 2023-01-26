import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Internet' })
export class InternetEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	personalAccount: number;

	@Column({ default: 0 })
	balance: number;

	@Column()
	nameSurname: string;

	@Column()
	address: string;
}
