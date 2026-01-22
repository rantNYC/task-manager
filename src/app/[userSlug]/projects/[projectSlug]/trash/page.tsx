import TaskGrid from '@/components/TaskGrid';
import { PageProps } from '@/model/page';
import { getTaks } from '@/lib/core/core';

export default async function TrashPage({ params }: PageProps) {
  const { userSlug, projectSlug } = await params;
  const tasks = await getTaks({ userSlug, projectSlug, isDeleted: true });

  return <TaskGrid tasks={tasks} />;
}