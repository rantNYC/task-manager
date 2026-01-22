import { getDashboardStats } from '@/lib/core/core';
import { StatCard } from '@/components/cards/StatCard';
import { WideCard } from '@/components/cards/WideCard';
import { DeletedList } from '@/components/cards/DeletedList';
import Link from 'next/link';
import { projectPath, sitePaths } from '@/lib/path/sitePaths';
import { PageProps } from '@/model/page';

export default async function ProjectPage({ params }: PageProps) {
  const { projectSlug, userSlug } = await params;

  const {
    name,
    total,
    completed,
    unfinished,
    completionRate,
    completedThisWeek,
    avgCompletionTime,
    mostActiveDay,
    recentlyDeleted,
  } = await getDashboardStats({ projectSlug, userSlug });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <h1 className="col-span-full text-2xl font-semibold">Project Name: {name}</h1>

      <StatCard title="Total Todos" value={total} />
      <StatCard title="Completion Rate" value={`${completionRate}%`} />

      <Link href={projectPath(userSlug, projectSlug, sitePaths.complete.href)}>
        <StatCard title="Completed" value={completed} />
      </Link>
      <Link href={projectPath(userSlug, projectSlug, sitePaths.incomplete.href)}>
        <StatCard title="Incomplete" value={unfinished} />
      </Link>

      <WideCard title="Completed This Week">{completedThisWeek}</WideCard>

      <WideCard title="Average Completion Time">
        {avgCompletionTime ? `${(avgCompletionTime / 3600).toFixed(1)} hours` : 'N/A'}
      </WideCard>

      <WideCard title="Most Active Day">{mostActiveDay}</WideCard>

      <WideCard title="Recently Deleted">
        <DeletedList items={recentlyDeleted} />
      </WideCard>
    </div>
  );
}