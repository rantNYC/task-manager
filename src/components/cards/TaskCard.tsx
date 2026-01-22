'use client';

import { TaskDTO } from '@/model/task';

type TodoCardProps = {
  disabled: boolean;
  description?: string | null;
  toggleAction: (slug: string, isCompleted: boolean) => void;
  deleteAction: (slug: string, isDeleted: boolean) => void;
} & TaskDTO;

export default function TaskCard({
  title,
  disabled,
  description,
  isCompleted,
  isDeleted,
  slug,
  toggleAction,
  deleteAction,
}: TodoCardProps) {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm transition hover:border-gray-700 hover:shadow-md">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <div className="min-w-0">
          <h3
            className="overflow-hidden text-lg font-semibold wrap-break-word text-ellipsis whitespace-nowrap text-gray-100"
            title={title}
          >
            {title}
          </h3>

          {description && (
            <p
              className="mt-1 max-h-12 overflow-hidden text-sm wrap-break-word text-gray-400"
              title={description}
            >
              {description}
            </p>
          )}
        </div>

        <button
          disabled={disabled}
          onClick={() => toggleAction(slug, !isCompleted)}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:brightness-110 active:scale-95'} ${isCompleted ? 'bg-green-500' : 'bg-gray-600'} `}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-gray-200 transition ${
              isCompleted ? 'translate-x-5' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div />

      <div className="flex items-center justify-between pt-4">
        <span className={`text-xs font-medium ${isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
          {isCompleted ? 'Completed' : 'Pending'}
        </span>

        <div className="rounded-md bg-gray-800 px-2 py-1">
          <button
            onClick={() => deleteAction(slug, !isDeleted)}
            disabled={disabled}
            className={`text-xs transition-all duration-200 disabled:opacity-50 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'} ${
              isDeleted
                ? 'text-blue-400 hover:text-blue-300 hover:brightness-110'
                : 'text-red-400 hover:text-red-300 hover:brightness-110'
            } `}
          >
            {isDeleted ? 'Restore' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}