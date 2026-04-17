import React from 'react';

const StatBar = ({ label, value, color, icon }) => {
  const getColorClass = () => {
    switch (color) {
      case 'purple': return 'bg-purple';
      case 'green': return 'bg-green';
      case 'orange': return 'bg-orange';
      case 'accent': return 'bg-accent';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-sm font-bold text-text px-1">
        <span className="flex items-center gap-1">
          {icon} {label}
        </span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden border border-gray-100 shadow-inner">
        <div 
          className={`h-full ${getColorClass()} transition-all duration-500 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
