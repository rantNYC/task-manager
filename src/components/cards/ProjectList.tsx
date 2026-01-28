import Link from 'next/link';
import { deleteProjectAction } from '@/lib/actions/projectAction';
import { icons } from '@/components/icons/icons';

type ProjectListProps = {
  items: {
    id: number;
    name: string;
    description?: string | null;
    slug?: string;
    is_deleted: boolean;
  }[];
  projectPath: string;
};

export function ProjectList({ items, projectPath }: ProjectListProps) {
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

          <div className="flex items-center gap-3">
            <Link
              href={`${projectPath}/${project.slug}/tasks`}
              className="group rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {icons.tasks}
            </Link>
            <Link
              href={`${projectPath}/${project.slug}`}
              className="group rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {icons.view}
            </Link>

            {/* Trash icon → delete project (server action) */}
            <form action={deleteProjectAction}>
              <input type="hidden" name="slug" value={project.slug} />
              <input type="hidden" name="isDeleted" value={String(!project.is_deleted)} />
              <button
                type="submit"
                className="group rounded p-1 text-gray-400 hover:cursor-pointer hover:bg-gray-800 hover:text-red-400"
              >
                {project.is_deleted ? icons.restore : icons.trash}
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}