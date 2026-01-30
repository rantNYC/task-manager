import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'priority' })
export class Priority {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  id!: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  color!: string;
}