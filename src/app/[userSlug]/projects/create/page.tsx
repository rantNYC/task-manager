import { createProject } from '@/lib/core/core';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getProjectPath } from '@/lib/path/sitePaths';
import { getSessionOrRedirect } from '@/lib/path/session';
import { PageProps } from '@/model/page';

export default async function ProjectCreatePage({ params }: PageProps) {
  const { email } = await getSessionOrRedirect();
  const { userSlug } = await params;

  const createProjectAction = async (formData: FormData) => {
    'use server';

    const name = formData.get('name')?.toString().trim();
    const description = formData.get('description')?.toString().trim();

    if (!name) {
      throw new Error('Project title is required');
    }

    const { success, project } = await createProject({ email, name, description });

    if (success) {
      revalidatePath(getProjectPath({ userSlug }).href);
      redirect(project.slug);
    }
  };

  return (
    <div className="ali w-full max-w-xl space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-100">Create a New Project</h1>
        <p className="text-sm text-gray-400">
          Give your project a name and an optional description.
        </p>
      </div>

      <form action={createProjectAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Project Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter project name..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-300">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            maxLength={500}
            placeholder="Describe your project..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-900/30 transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}