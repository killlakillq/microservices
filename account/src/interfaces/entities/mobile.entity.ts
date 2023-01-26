import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Mobile' })
export class MobileEntity extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true, nullable: false })
	phoneNumber: number;

	@Column()
	operator: string;
}
