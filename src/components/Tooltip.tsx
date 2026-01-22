'use client';

import { MouseEvent, ReactNode, useState } from 'react';

export default function Tooltip({ message, children }: { message: string; children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMove}
    >
      {visible && (
        <div
          className="pointer-events-none fixed z-50 rounded-md bg-gray-700/90 px-3 py-1 text-xs text-gray-200 shadow-lg transition-opacity duration-150"
          style={{
            top: pos.y - 35, // 35px above cursor
            left: pos.x,
            transform: 'translateX(-50%)',
          }}
        >
          {message}
        </div>
      )}

      {children}
    </div>
  );
}