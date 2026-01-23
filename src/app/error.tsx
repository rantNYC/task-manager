'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-6 py-20">
      <h1 className="text-3xl font-bold text-red-400">Something went wrong</h1>

      <p className="max-w-md text-center text-gray-400">
        An unexpected error occurred while loading this page. You can try again or return to the
        main page.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-gray-800 px-6 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Go to Main Page
        </Link>
      </div>
    </div>
  );
}