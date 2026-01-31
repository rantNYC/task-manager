import { Task } from '@/lib/db/entities/Task';
import { SearchParams } from '@/model/page';

export type TaskSearchParams = {
  priorities?: string[];
  categories?: string[];
};

export const extractFilters = (
  searchParams?: SearchParams,
): TaskSearchParams => {
  const toArray = (value?: string | string[]) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value];
  return {
    priorities: toArray(searchParams?.priorities),
    categories: toArray(searchParams?.categories),
  };
};

export const buildSearchParams = (
  current: Record<string, string | string[] | undefined>,
  next: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();

  Object.entries(current).forEach(([key, value]) => {
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else if (value) params.set(key, value);
  });

  Object.entries(next).forEach(([key, value]) => {
    params.delete(key);
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
    else if (value) params.set(key, value);
  });

  return `?${params.toString()}`;
};

export const toggleValue = (
  current: string | string[] | undefined,
  value: string,
): string[] => {
  const arr = Array.isArray(current) ? current : current ? [current] : [];
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
};

export const filterTasks = (filters: TaskSearchParams) => (task: Task) => {
  return (
    !(
      filters.priorities?.length &&
      (!task.priority?.name || !filters.priorities.includes(task.priority.name))
    ) &&
    !(
      filters.categories?.length &&
      (!task.category?.name || !filters.categories.includes(task.category.name))
    )
  );
};