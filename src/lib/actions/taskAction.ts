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