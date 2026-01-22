import TaskGrid from '@/components/TaskGrid';
import { PageProps } from '@/model/page';
import { getTaks } from '@/lib/core/core';

export default async function CompletedPage({ params }: PageProps) {
  const { userSlug, projectSlug } = await params;

  const tasks = await getTaks({ userSlug, projectSlug, isCompleted: true, isDeleted: false });

  return <TaskGrid tasks={tasks} />;
}