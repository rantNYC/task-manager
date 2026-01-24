'use server';

import { revalidatePath } from 'next/cache';
import { markAsValue } from '@/lib/core/core';

export async function completeTodo(slug: string, isCompleted: boolean, path: string) {
  const { success } = await markAsValue({
    slug,
    column: 'is_completed',
    value: isCompleted,
    repo: 'task',
  });
  if (success) {
    revalidatePath(path);
  }
}

export async function deleteTodo(slug: string, isDeleted: boolean, path: string) {
  const { success } = await markAsValue({
    slug,
    column: 'is_deleted',
    value: isDeleted,
    repo: 'task',
  });
  if (success) {
    revalidatePath(path);
  }
}

export async function handleAction(formData: FormData) {
  const slug = formData.get('slug') as string;
  const action = formData.get('action') as string;

  switch (action) {
    case 'complete':
      return completeTodo(slug, true, '/');
    case 'uncomplete':
      return completeTodo(slug, false, '/');
    case 'delete':
      return deleteTodo(slug, true, '/');
    case 'restore':
      return deleteTodo(slug, false, '/');
  }
}