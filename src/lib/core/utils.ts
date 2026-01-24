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
  description: task.description,
  isCompleted: task.is_completed,
  isDeleted: task.is_deleted,
  slug: task.slug,
});

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const formatDuration = (seconds: number) => {
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = weeks / 4; // ~30 days

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes.toFixed(1)} minutes`;
  if (hours < 24) return `${hours.toFixed(1)} hours`;
  if (days < 7) return `${days.toFixed(1)} days`;
  if (weeks < 4) return `${weeks.toFixed(1)} weeks`;
  return `${months.toFixed(1)} months`;
};