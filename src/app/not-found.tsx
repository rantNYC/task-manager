import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-100">Project Not Found</h1>

      <h2 className="mt-2 max-w-xl text-lg leading-relaxed text-gray-400">
        The project you&#39;re looking for doesn&#39;t exist or you may not have access to it.
      </h2>

      <Link
        href="/"
        className="mt-6 rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition hover:bg-gray-600"
      >
        Go Back
      </Link>
    </div>
  );
}