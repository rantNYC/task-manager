'use client';

import { ReactNode, useState } from 'react';
import Tooltip from '@/components/Tooltip';

export default function Accordion({
  title,
  children,
  disabled = false,
  tooltip,
}: {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setOpen(!open);
  };

  const accordionContent = (
    <div className="rounded-lg border border-gray-700/40 bg-gray-800/40">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`flex w-full items-center justify-between p-4 text-left font-medium ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer text-gray-200'} `}
      >
        <span>{title}</span>

        <span
          className={`transform text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'} ${disabled ? 'opacity-40' : ''} `}
        >
          ▼
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} `}
      >
        <div className="border-t border-gray-700/40 p-4 text-gray-300">{children}</div>
      </div>
    </div>
  );

  return disabled && tooltip ? (
    <Tooltip message={tooltip}>{accordionContent}</Tooltip>
  ) : (
    accordionContent
  );
}