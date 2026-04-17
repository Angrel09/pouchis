import React from 'react';

const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg flex justify-center py-4 sm:py-8 px-4">
      <div className="w-full max-w-sm flex flex-col relative pb-20">
        {children}
      </div>
    </div>
  );
};

export default AppShell;
