import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'status' })
export class Status {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;
}