import Link from 'next/link';
import { sitePaths } from '@/lib/path/sitePaths';
import { deleteProjectAction } from '@/lib/actions/projectAction';

type ProjectListProps = {
  items: {
    id: number;
    name: string;
    description?: string | null;
    slug?: string;
    is_deleted: boolean;
  }[];
};

export function ProjectList({ items }: ProjectListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map(project => (
        <li
          key={project.slug}
          className="flex items-start justify-between rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm"
        >
          {/* Left side: project info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200">{project.name}</h3>
            {project.description && (
              <p className="mt-1 text-xs text-gray-400">{project.description}</p>
            )}
          </div>

          {/* Right side: icons */}
          <div className="flex items-center gap-3">
            {/* Eye icon → open project */}
            <Link
              href={`${sitePaths.project.href}/${project.slug}`}
              className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>

            {/* Trash icon → delete project (server action) */}
            <form action={deleteProjectAction}>
              <input type="hidden" name="slug" value={project.slug} />
              <input type="hidden" name="isDeleted" value={String(!project.is_deleted)} />
              <button
                type="submit"
                className="rounded p-1 text-gray-400 hover:cursor-pointer hover:bg-gray-800 hover:text-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7h12M9 7V4h6v3m-7 4v7m4-7v7m4-7v7M4 7h16l-1 13H5L4 7z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}