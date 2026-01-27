import { findUserByEmail } from '@/lib/core/core';
import { getSessionOrRedirect } from '@/lib/path/session';
import { ProjectList } from '@/components/cards/ProjectList';
import { getProjectPath } from '@/lib/path/sitePaths';
import Link from 'next/link';

export default async function TrashPage() {
  const sessionUser = await getSessionOrRedirect();
  const user = await findUserByEmail({ email: sessionUser.email });

  const deletedProjects = user?.projects.filter(p => p.is_deleted) ?? [];

  const projectBasePath = getProjectPath({
    userSlug: user?.slug ?? '',
  }).href;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-200">Deleted Projects</h1>

        {/* Go Back Button */}
        <Link
          href={projectBasePath.replace('/trash', '')}
          className="rounded-md bg-gray-700 px-3 py-1 text-sm font-medium text-gray-200 transition-all duration-200 hover:scale-105 hover:bg-gray-600 active:scale-95"
        >
          Go Back
        </Link>
      </div>

      {deletedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
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
            You haven’t deleted any projects. Deleted projects will appear here until you restore or
            permanently remove them.
          </p>

          {/* Go Back Button (also shown in empty state) */}
          <Link
            href={projectBasePath.replace('/trash', '')}
            className="mt-6 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition-all duration-200 hover:scale-105 hover:bg-gray-600 active:scale-95"
          >
            Go Back
          </Link>
        </div>
      ) : (
        <ProjectList items={deletedProjects} projectPath={projectBasePath} />
      )}
    </div>
  );
}