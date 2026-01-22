import TaskGrid from '@/components/TaskGrid';
import { getTaks } from '@/lib/core/core';
import { PageProps } from '@/model/page';

export default async function InCompletedPage({ params }: PageProps) {
  const { userSlug, projectSlug } = await params;
  const tasks = await getTaks({ userSlug, projectSlug, isCompleted: false, isDeleted: false });

  return <TaskGrid tasks={tasks} />;
}