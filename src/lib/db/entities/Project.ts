import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import type { User } from './User';
import type { Task } from './Task';

@Entity({ name: 'projects' })
@Unique(['user', 'slug']) // NEW: unique per user
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('users', 'projects', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at!: Date | null;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @OneToMany('tasks', 'project')
  tasks!: Task[];
}