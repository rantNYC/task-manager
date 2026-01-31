import { Task } from '@/lib/db/entities/Task';
import Link from 'next/link';
import FilterPill from '@/components/filters/FilterPill';
import { buildSearchParams, SORTABLE_FIELDS, TaskSearchParams, toggleValue, } from '@/lib/core/filters';
import { capitalize, extractUniqueValues } from '@/lib/core/utils';
import { SearchParams } from '@/model/page';
import { icons } from '@/components/icons/icons';

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

const SortCollection = ({
  title,
  params,
  values,
}: {
  title: string;
  params: SearchParams;
  values: Array<{ name: string; label: string }>;
}) => {
  const currentField = params.sortField;
  const currentDir = params.sortDirection ?? 'asc';

  return (
    <div className='flex flex-wrap gap-2'>
      <span className='content-center'>{title}:</span>
      {values.map((v, idx) => {
        const nextDir = currentDir === 'asc' ? 'desc' : 'asc';

        return (
          <Link
            key={idx}
            href={buildSearchParams(params, {
              sortField: v.name,
              sortDirection: nextDir,
            })}
          >
            <FilterPill
              active={currentField?.includes(v.name) ?? false}
              color='#4DA3FF'
            >
              <div className='group flex flex-wrap gap-2 items-center'>
                {v.label}
                {currentDir === 'asc' ? icons.arrowUp : icons.arrowDown}
              </div>
            </FilterPill>
          </Link>
        );
      })}
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
    status: extractUniqueValues(
      tasks,
      (task) => task.status?.id ?? null,
      (task) => task.status!,
    ),
  };

  return (
    <div className='flex flex-wrap gap-2 justify-between'>
      <div>
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
        <FilterCollection
          title={'Status'}
          toggle='status'
          params={filters}
          values={availableFilters.status}
        />
      </div>
      <div className='flex items-end flex-col justify-between'>
        <Link
          href='?'
          className='mt-1 inline-block rounded px-2 py-1
             bg-gray-700 text-gray-400
             hover:bg-gray-600 hover:text-gray-200'
        >
          <div className='group flex items-center gap-1'>
            <span>Clear</span> {icons.clear}
          </div>
        </Link>
        <SortCollection
          title='Sort by'
          params={filters}
          values={SORTABLE_FIELDS}
        />
      </div>
    </div>
  );
}