import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/core/utils';

export default async function HomePage() {
  const session = await getServerSession();

  // If logged in → go to dashboard
  if (session?.user && session?.user.name) {
    redirect(`/${slugify(session.user.name)}/projects`);
  }

  // If not logged in → show landing page
  return (
    <div className="w-full max-w-lg space-y-6 pt-4 text-center">
      <h1 className="text-4xl font-bold text-gray-100">Welcome to Your TODO App</h1>

      <p className="text-sm text-gray-400">
        Organize your tasks, stay productive, and keep everything in one place.
      </p>

      <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/signin"
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-lg border border-gray-700 px-6 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-800"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}