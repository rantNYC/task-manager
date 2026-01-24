import { PageProps } from '@/model/page';
import { createTask, getProjectByUser } from '@/lib/core/core';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function CreateTaskPage({ params }: PageProps) {
  const { userSlug, projectSlug } = await params;
  const createTaskAction = async (formData: FormData) => {
    'use server';

    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();

    if (!title) {
      throw new Error('Task title is required');
    }

    const { project } = await getProjectByUser({ projectSlug, userSlug });
    if (!project) {
      throw new Error('Project not found');
    }

    const { success } = await createTask({
      title,
      description,
      projectId: project.id,
    });

    if (success) {
      // Revalidate the project page
      revalidatePath(`/${userSlug}/projects/${projectSlug}`);

      // Redirect to the project page (or task page if you want)
      redirect(`/${userSlug}/projects/${projectSlug}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-8 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-100">Create a New Task</h1>
        <p className="text-sm text-gray-400">
          Add a task to your project with an optional description.
        </p>
      </div>
      <form action={createTaskAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-300">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title..."
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
            rows={10}
            maxLength={500}
            placeholder="Describe your task..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-900/30 transition hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}