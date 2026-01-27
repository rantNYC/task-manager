import TaskGrid from '@/components/TaskGrid';
import { notFound } from 'next/dist/client/components/not-found';
import { PageProps } from '@/model/page';
import { getProjectByUser } from '@/lib/core/core';

export default async function TasksPage({ params }: PageProps) {
  const { projectSlug, userSlug } = await params;
  const { project } = await getProjectByUser({ projectSlug, userSlug });

  if (!project) {
    notFound();
  }

  const activeTasks = project.tasks
    .filter(t => !t.is_deleted)
    .sort((a, b) => {
      if (a.is_completed !== b.is_completed) {
        return a.is_completed ? 1 : -1;
      }
      return b.created_at.getTime() - a.created_at.getTime();
    });

  if (activeTasks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 text-indigo-400">
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
              d="M4 6h3m3 0h10M4 12h3m3 0h10M4 18h3m3 0h10"
            />
          </svg>
        </div>

        <h2 className="text-lg font-semibold text-gray-200">No tasks yet</h2>
        <p className="mt-1 max-w-sm text-sm text-gray-400">
          You haven’t created any tasks for this project. New tasks will appear here as soon as you
          add them.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <h2 className="mb-2 text-xl font-semibold">Tasks</h2>
      <TaskGrid tasks={activeTasks} />
    </div>
  );
}