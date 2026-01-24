import { getDashboardStats, getProjectByUser } from '@/lib/core/core';
import { StatCard } from '@/components/cards/StatCard';
import { WideCard } from '@/components/cards/WideCard';
import { TaskList } from '@/components/cards/TaskList';
import { PageProps } from '@/model/page';
import { formatDuration } from '@/lib/core/utils';
import TaskGrid from '@/components/TaskGrid';
import { notFound } from 'next/dist/client/components/not-found';

export default async function ProjectPage({ params }: PageProps) {
  const { projectSlug, userSlug } = await params;

  const { project } = await getProjectByUser({ projectSlug, userSlug });
  if (!project) {
    notFound();
  }
  const {
    total,
    totalActive,
    totalDeleted,
    completed,
    unfinished,
    completionRate,
    completedThisWeek,
    avgCompletionTime,
    mostActiveDay,
    recentlyDeleted,
    recentlyCompleted,
  } = await getDashboardStats({ tasks: project.tasks });

  const activeTasks = project.tasks
    .filter(t => !t.is_deleted)
    .sort((t1, t2) => t2.created_at.getTime() - t1.created_at.getTime());

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <h1 className="col-span-full text-3xl font-bold tracking-tight text-gray-100">
        {project.name}
      </h1>

      <h2 className="col-span-full max-w-3xl text-lg leading-relaxed text-gray-400">
        {project.description}
      </h2>

      <StatCard title="Completed" value={completed} />
      <StatCard title="Incomplete" value={unfinished} />
      <StatCard title="Total Todos" value={total} />
      <StatCard title="Total Active" value={totalActive} />
      <StatCard title="Total Deleted" value={totalDeleted} />
      <StatCard title="Completion Rate" value={`${completionRate}%`} />
      <WideCard title="Completed This Week">{completedThisWeek}</WideCard>

      <WideCard title="Average Completion Time">
        {avgCompletionTime ? `${formatDuration(avgCompletionTime)}` : 'N/A'}
      </WideCard>
      <WideCard title="Most Active Day">{mostActiveDay}</WideCard>
      <WideCard title={'Recently Completed'}>
        <TaskList items={recentlyCompleted} />
      </WideCard>
      <WideCard title="Recently Deleted">
        <TaskList items={recentlyDeleted} />
      </WideCard>
      {activeTasks.length > 0 && (
        <div className="col-span-full">
          <h2 className="mb-2 text-xl font-semibold">Tasks</h2>
          <TaskGrid tasks={activeTasks} />
        </div>
      )}
    </div>
  );
}