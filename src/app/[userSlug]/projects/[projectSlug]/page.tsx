import { getDashboardStats, getProjectByUser } from '@/lib/core/core';
import { StatCard } from '@/components/cards/StatCard';
import { WideCard } from '@/components/cards/WideCard';
import { TaskList } from '@/components/cards/TaskList';
import { PageProps } from '@/model/page';
import { formatDuration } from '@/lib/core/utils';
import { notFound } from 'next/dist/client/components/not-found';
import { getProjectPath, sitePaths } from '@/lib/path/sitePaths';
import Link from 'next/link';

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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <h1 className="col-span-full text-3xl font-bold tracking-tight text-gray-100">
        {project.name}
      </h1>

      <h2 className="col-span-full max-w-3xl text-lg leading-relaxed text-gray-400">
        {project.description}
      </h2>

      <Link href={getProjectPath({ userSlug, projectSlug, subpath: sitePaths.tasks.href }).href}>
        <StatCard title="Incomplete" value={unfinished} />
      </Link>
      <StatCard title="Completed" value={completed} />
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
    </div>
  );
}