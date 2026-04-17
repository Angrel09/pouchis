import React from 'react';

const Toast = ({ message, type }) => {
  if (!message) return null;

  const getStyles = () => {
    switch (type) {
      case 'error': return 'bg-primary text-white';
      case 'warning': return 'bg-orange text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg font-bold z-50 animate-in slide-in-from-bottom duration-300 ${getStyles()}`}>
      {message}
    </div>
  );
};

export default Toast;
