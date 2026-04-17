import React from 'react';

const ActionButton = ({ icon, label, color, onClick, disabled }) => {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'bg-green';
      case 'orange': return 'bg-orange';
      case 'blue': return 'bg-secondary';
      case 'purple': return 'bg-purple';
      default: return 'bg-primary';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${getColorClass()} p-4 rounded-card shadow-card flex flex-col items-center justify-center gap-2 hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 group`}
    >
      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      <span className="text-white font-fredoka uppercase tracking-wider text-xs">
        {label}
      </span>
    </button>
  );
};

export default ActionButton;
