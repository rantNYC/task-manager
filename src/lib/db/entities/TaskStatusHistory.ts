import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Task } from './Task';
import type { Status } from './Status';

@Entity({ name: 'task_status_history' })
export class TaskStatusHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('tasks', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task!: Task;

  @ManyToOne('status', { nullable: true })
  @JoinColumn({ name: 'old_status_id' })
  old_status!: Status | null;

  @ManyToOne('status', { nullable: true })
  @JoinColumn({ name: 'new_status_id' })
  new_status!: Status | null;

  @CreateDateColumn({ type: 'timestamp' })
  changed_at!: Date;
}