import React from 'react';

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`learn-more-btn group relative inline-block cursor-pointer border-0 p-0 min-w-[12rem] h-12 ${className}`}
      style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
    >
      {/* Semi-transparent white background */}
      <span className="absolute inset-0 rounded-full bg-white/30 backdrop-blur-sm"></span>
      
      <span className="circle-bg absolute left-0 top-0 m-0 block h-12 w-12 rounded-full bg-[#10552E] transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full group-hover:rounded-full" style={{ zIndex: 1 }}>
        <span 
          className="icon-arrow absolute left-[0.625rem] block h-[0.125rem] w-[1.125rem] transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-4 group-hover:bg-white"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none'
          }}
        >
          <span 
            className="arrow-head absolute -top-[0.29rem] right-[0.0625rem] block h-[0.625rem] w-[0.625rem] border-r-[0.125rem] border-t-[0.125rem] border-white"
            style={{
              transform: 'rotate(45deg)'
            }}
          />
        </span>
      </span>
      <span className="button-text absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center py-3 pl-[1.85rem] pr-4 text-center text-sm font-bold uppercase leading-[1.6] text-[#10552E] transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white" style={{ zIndex: 2 }}>
        {children}
      </span>
    </button>
  );
};

