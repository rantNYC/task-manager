import { Task } from '@/lib/db/entities/Task';
import Link from 'next/link';
import FilterPill from '@/components/filters/FilterPill';
import { buildSearchParams, TaskSearchParams, toggleValue, } from '@/lib/core/filters';
import { capitalize, extractUniqueValues } from '@/lib/core/utils';
import { SearchParams } from '@/model/page';

type TaskFiltersProps = {
  tasks: Task[];
  filters: TaskSearchParams;
};

const FilterCollection = ({
  title,
  toggle,
  params,
  values,
}: {
  title: string;
  toggle: keyof TaskSearchParams;
  params: SearchParams;
  values: Array<{ name: string; color: string }>;
}) => {
  const current = params[toggle];

  return (
    <div className='flex flex-wrap gap-2'>
      <span className='content-center'>{title}:</span>
      {values.map((priority, idx) => (
        <Link
          key={idx}
          href={buildSearchParams(params, {
            [toggle]: toggleValue(current, priority.name),
          })}
        >
          <FilterPill
            active={current?.includes(priority.name) ?? false}
            color={priority.color}
          >
            {capitalize(priority.name)}
          </FilterPill>
        </Link>
      ))}
    </div>
  );
};

export default function TaskFilters({ tasks, filters }: TaskFiltersProps) {
  const availableFilters = {
    priorities: extractUniqueValues(
      tasks,
      (task) => task.priority?.id ?? null,
      (task) => task.priority!,
    ),
    categories: extractUniqueValues(
      tasks,
      (task) => task.category?.id ?? null,
      (task) => task.category!,
    ),
  };

  return (
    <>
      <FilterCollection
        title='Priorities'
        toggle='priorities'
        params={filters}
        values={availableFilters.priorities}
      />
      <FilterCollection
        title={'Collections'}
        toggle='categories'
        params={filters}
        values={availableFilters.categories}
      />
    </>
  );
}