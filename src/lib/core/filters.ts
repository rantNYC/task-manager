import { Task } from '@/lib/db/entities/Task';
import { SearchParams } from '@/model/page';

export type TaskSearchParams = {
  priorities?: string[];
  categories?: string[];
  status?: string[];
  sortField?: keyof Task;
  sortDirection?: 'asc' | 'desc';
};

export type SortableField = {
  name: keyof Task;
  label: string;
};

export const SORTABLE_FIELDS: SortableField[] = [
  {
    name: 'created_at',
    label: 'Created',
  },
  {
    name: 'completed_at',
    label: 'Completed',
  },
  { name: 'title', label: 'Title' },
];

function isTaskKey(value: string): value is keyof Task {
  return SORTABLE_FIELDS.map((s) => s.name).includes(value as keyof Task);
}

function isSortDirection(value: string): value is 'asc' | 'desc' {
  return value === 'asc' || value === 'desc';
}

export const extractFilters = (
  searchParams?: SearchParams,
): TaskSearchParams => {
  const toArray = (value?: string | string[]) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value];

  const toUnique = (value?: string | string[]) =>
    value === undefined ? undefined : Array.isArray(value) ? undefined : value;

  const rawSortField = toUnique(searchParams?.sortField);
  const rawSortDirection = toUnique(searchParams?.sortDirection);

  return {
    priorities: toArray(searchParams?.priorities),
    categories: toArray(searchParams?.categories),
    status: toArray(searchParams?.status),
    sortField:
      rawSortField && isTaskKey(rawSortField) ? rawSortField : undefined,
    sortDirection:
      rawSortDirection && isSortDirection(rawSortDirection)
        ? rawSortDirection
        : undefined,
  };
};

export const buildSearchParams = (
  current: SearchParams,
  next: SearchParams,
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
    ) &&
    !(
      filters.status?.length &&
      (!task.status?.name || !filters.status.includes(task.status.name))
    )
  );
};

export const sortTasks = (filters: TaskSearchParams) => {
  const field = filters.sortField;
  const direction = filters.sortDirection === 'asc' ? 1 : -1;

  if (!field) return () => 0;

  return (a: Task, b: Task) => {
    const av = a[field];
    const bv = b[field];

    const aU = av === undefined || av === null;
    const bU = bv === undefined || bv === null;

    if (aU && bU) return 0;
    if (aU) return 1;
    if (bU) return -1;

    if (av instanceof Date && bv instanceof Date) {
      return (av.getTime() - bv.getTime()) * direction;
    }

    if (typeof av === 'string' && typeof bv === 'string') {
      return av.localeCompare(bv) * direction;
    }

    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * direction;
    }

    return 0;
  };
};