import React from 'react';

interface DividerProps {
  marginClass?: string; // e.g., 'my-3', 'my-1'
  colorVar?: string;    // CSS var name or any valid color value
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ marginClass = 'my-3', colorVar = 'var(--border-secondary)', className = '' }) => {
  return (
    <div className={`${marginClass} flex justify-center ${className}`}>
      <div className="h-[1px] w-full" style={{ backgroundColor: colorVar }} />
    </div>
  );
};

export default Divider;


