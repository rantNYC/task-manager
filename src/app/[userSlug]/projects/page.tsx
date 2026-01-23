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
  const activeProjects = user?.projects.filter(p => !p.is_completed && !p.is_deleted) ?? [];
  const completedProjects = user?.projects.filter(p => p.is_completed && !p.is_deleted) ?? [];
  const deletedProject = user?.projects.filter(p => p.is_deleted) ?? [];

  return (
    <div className="w-full max-w-3xl space-y-10 pt-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold text-gray-100">Your Projects</h1>
        <p className="text-sm text-gray-400">Track progress, manage tasks, and stay organized.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard title="Total Projects" value={totalProjects} />
        <StatCard title="Deleted" value={deletedProject.length} />
        <StatCard title="Active" value={activeProjects.length} />
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
        <h2 className="text-xl font-semibold text-gray-200">Active Projects</h2>
        {user?.projects.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <p className="text-sm text-gray-400">No projects yet. Start by creating one.</p>
          </div>
        ) : (
          <ProjectList
            items={user?.projects ?? []}
            projectPath={getProjectPath({ userSlug: user?.slug ?? '' }).href}
          />
        )}
      </div>
    </div>
  );
}