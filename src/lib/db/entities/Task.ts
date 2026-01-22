import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import type { Project } from './Project';

@Entity({ name: 'tasks' })
@Unique(['project', 'slug'])
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('projects', 'tasks', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project!: Project;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'boolean', default: false })
  is_completed!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completed_at!: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at!: Date;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;
}