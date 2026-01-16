import React from 'react';

interface CrosshairProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const Crosshair: React.FC<CrosshairProps> = ({ position, className = '' }) => {
  let posClass = '';
  switch (position) {
    case 'top-left': posClass = 'top-0 left-0'; break;
    case 'top-right': posClass = 'top-0 right-0'; break;
    case 'bottom-left': posClass = 'bottom-0 left-0'; break;
    case 'bottom-right': posClass = 'bottom-0 right-0'; break;
  }

  return (
    <div className={`absolute ${posClass} w-8 h-8 flex items-center justify-center pointer-events-none z-20 ${className}`}>
      <div className="absolute w-full h-[1px] bg-white/30"></div>
      <div className="absolute h-full w-[1px] bg-white/30"></div>
    </div>
  );
};

export default Crosshair;