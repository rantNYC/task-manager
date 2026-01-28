'use server';

import { revalidatePath } from 'next/cache';
import { updateTaskStatus } from '@/lib/core/core';

export async function completeTodo(slug: string, isCompleted: boolean, path: string) {
  await updateTaskStatus(slug, isCompleted ? 'completed' : 'backlog');
  revalidatePath(path);
}

export async function deleteTodo(slug: string, isDeleted: boolean, path: string) {
  await updateTaskStatus(slug, isDeleted ? 'deleted' : 'backlog');
  revalidatePath(path);
}

export async function startTask(slug: string, path: string) {
  await updateTaskStatus(slug, 'in_progress');
  revalidatePath(path);
}

export async function handleAction(formData: FormData) {
  const slug = formData.get('slug') as string;
  const action = formData.get('action') as string;

  switch (action) {
    case 'complete':
      return completeTodo(slug, true, '/');
    case 'incomplete':
      return completeTodo(slug, false, '/');
    case 'delete':
      return deleteTodo(slug, true, '/');
    case 'restore':
      return deleteTodo(slug, false, '/');
  }
}