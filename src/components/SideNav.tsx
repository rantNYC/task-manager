'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PathMetadata } from '@/lib/path/sitePaths';

export default function SideNav({
  paths,
  footer,
}: {
  paths: PathMetadata[];
  footer: PathMetadata;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-gray-800 bg-gray-900/60 pt-4 pb-4 backdrop-blur-sm">
      <nav className="flex h-full flex-col justify-between gap-1">
        <div>
          {paths.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div>
          <Link
            key={footer.href}
            href={footer.href}
            className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white`}
          >
            {footer.icon && <span>{footer.icon}</span>}
            <span>{footer.label}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}