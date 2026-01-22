import { ReactNode } from 'react';

type WideCardProps = {
  title: string;
  children: ReactNode;
};

export function WideCard({ title, children }: WideCardProps) {
  return (
    <div className="col-span-1 rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm transition hover:border-gray-700 hover:shadow-md md:col-span-2 xl:col-span-4">
      <p className="mb-2 text-sm text-gray-400">{title}</p>
      <div className="text-gray-200">{children}</div>
    </div>
  );
}