import { ReactNode } from 'react';

const FilterPill = ({
  active,
  color,
  children,
}: {
  active: boolean;
  color: string;
  children: ReactNode;
}) => (
  <span
    className={`mt-1 inline-block rounded px-2 py-1 hover:cursor-pointer hover:bg-neutral-600 ${
      active ? 'bg-gray-600' : 'bg-gray-800'
    }`}
    style={{ color }}
  >
    {children}
  </span>
);

export default FilterPill;