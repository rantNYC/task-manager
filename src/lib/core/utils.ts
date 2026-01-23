import { Task } from '@/lib/db/entities/Task';
import { TaskDTO } from '@/model/task';

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const toTaskDTO = (task: Task): TaskDTO => ({
  title: task.title,
  isCompleted: task.is_completed,
  isDeleted: task.is_deleted,
  slug: task.slug,
});

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};