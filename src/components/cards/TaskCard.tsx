import { Task } from '@/lib/db/entities/Task';

type TodoCardProps = {
  task: Task;
  handleAction: (formData: FormData) => void;
};

export default function TaskCard({ task, handleAction }: TodoCardProps) {
  return (
    <form
      action={handleAction}
      className="grid h-full min-h-40 w-full grid-rows-[auto_1fr_auto] rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm"
    >
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <h3
          className="max-h-7 overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap text-gray-100"
          title={task.title}
        >
          {task.title}
        </h3>

        <button
          type="submit"
          name="action"
          value={task.status?.role === 'completed' ? 'incomplete' : 'complete'}
          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all hover:cursor-pointer ${
            task.status?.role === 'completed' ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-gray-200 transition ${
              task.status?.role === 'completed' ? 'translate-x-5' : 'translate-x-1'
            } `}
          />
        </button>
      </div>
      {task.description ? (
        <p className="scrollbar mt-1 max-h-24 overflow-y-auto text-sm text-gray-400">
          {task.description}
        </p>
      ) : (
        <div />
      )}

      <div className="flex items-center justify-between pt-4">
        <span
          className={`text-xs font-medium ${task.status?.role === 'completed' ? 'text-green-400' : 'text-gray-500'}`}
        >
          {task.status?.role === 'completed' ? 'Completed' : 'Pending'}
        </span>

        <button
          type="submit"
          name="action"
          value={task.status?.role === 'deleted' ? 'restore' : 'delete'}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-105 hover:cursor-pointer active:scale-95 ${
            task.status?.role === 'deleted'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          } `}
        >
          {task.status?.role === 'deleted' ? 'Restore' : 'Delete'}
        </button>
      </div>

      <input type="hidden" name="slug" value={task.slug} />
    </form>
  );
}