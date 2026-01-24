import { getSessionOrRedirect } from '@/lib/path/session';
import { findUserByEmail } from '@/lib/core/core';
import { StatCard } from '@/components/cards/StatCard';
import Link from 'next/link';
import { getProjectPath, sitePaths } from '@/lib/path/sitePaths';
import { ProjectList } from '@/components/cards/ProjectList';

export default async function ProjectsPage() {
  const sessionUser = await getSessionOrRedirect();

  const user = await findUserByEmail({ email: sessionUser.email });
  const totalProjects = user?.projects.length ?? 0;
  const activeProjects =
    user?.projects
      .filter(p => !p.is_deleted)
      .sort((p1, p2) => p1.created_at.getTime() - p2.created_at.getTime()) ?? [];
  const completedProjects = user?.projects.filter(p => !p.is_deleted) ?? [];
  const deletedProject = user?.projects.filter(p => p.is_deleted) ?? [];

  console.log('projects', activeProjects);

  return (
    <div className="w-full max-w-3xl space-y-10 pt-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-gray-100">Your Projects</h1>
        <p className="text-sm text-gray-400">Track progress, manage tasks, and stay organized.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard title="Total Projects" value={totalProjects} />
        <StatCard title="Active" value={activeProjects.length} />
        <StatCard title="Deleted" value={deletedProject.length} />
        <StatCard title="Completed" value={completedProjects.length} />
      </div>

      <div className="flex justify-center">
        <Link
          href={sitePaths.projectCreate.href}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          + Create Project
        </Link>
      </div>

      <div className="space-y-4">
        {activeProjects.length === 0 ? (
          <p className="text-lg text-gray-400">No active projects yet. Start by creating one.</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-200">Active Projects</h2>
            <ProjectList
              items={activeProjects}
              projectPath={getProjectPath({ userSlug: user?.slug ?? '' }).href}
            />
          </>
        )}
      </div>
    </div>
  );
}