'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNav({ paths }: { paths: Array<{ href: string; label: string }> }) {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 border-r border-gray-700/40 bg-gray-900/40 p-4">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${pathname === '/' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
            />
          </svg>
          Home
        </Link>
        {paths.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}