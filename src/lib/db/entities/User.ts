import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'text' })
  password_hash!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name!: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at!: Date | null;

  @Column({ unique: true, nullable: true })
  slug!: string;

  @JoinColumn({ name: 'project_id' })
  @OneToMany(() => Project, project => project.user)
  projects!: Project[];
}