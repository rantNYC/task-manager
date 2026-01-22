'use server';

import { markAsValue } from '@/lib/core/core';
import { revalidatePath } from 'next/cache';

export async function deleteProjectAction(formData: FormData) {
  const slug = formData.get('slug');
  const isDeleted = formData.get('isDeleted');

  if (slug === null || isDeleted === null) {
    throw new Error('Invalid slug');
  }

  const { success } = await markAsValue({
    slug: slug.toString(),
    column: 'is_deleted',
    value: isDeleted === 'true',
    repo: 'project',
  });
  if (success) {
    revalidatePath('/');
  }
}