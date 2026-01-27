import TaskGrid from '@/components/TaskGrid';
import { PageProps } from '@/model/page';
import { getTaks } from '@/lib/core/core';

export default async function TrashPage({ params }: PageProps) {
  const { userSlug, projectSlug } = await params;
  const tasks = await getTaks({ userSlug, projectSlug, isDeleted: true });

  if (tasks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 7h12M9 7V4h6v3m-7 4v7m4-7v7m4-7v7M4 7h16l-1 13H5L4 7z"
            />
          </svg>
        </div>

        <h2 className="text-lg font-semibold text-gray-200">Trash is empty</h2>
        <p className="mt-1 max-w-sm text-sm text-gray-400">
          You haven’t deleted any tasks yet. Deleted tasks will appear here until you restore or
          permanently remove them.
        </p>
      </div>
    );
  }

  return <TaskGrid tasks={tasks} />;
}