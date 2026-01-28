import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import type { Project } from './Project';
import type { Priority } from './Priority';
import type { Status } from './Status';
import type { Category } from './Category';
import type { Tag } from './Tag';

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

  @ManyToOne('priority', { nullable: true })
  @JoinColumn({ name: 'priority_id' })
  priority!: Priority | null;

  @ManyToOne('status', { nullable: true })
  @JoinColumn({ name: 'status_id' })
  status!: Status | null;

  @ManyToOne('categories', { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'varchar', length: 255 })
  slug!: string;

  @Column({ type: 'timestamp', nullable: true })
  completed_at!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  in_progress_at!: Date | null;

  @ManyToMany('tags', { cascade: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags!: Tag[];
}