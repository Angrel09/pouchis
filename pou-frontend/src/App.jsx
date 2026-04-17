import React from 'react';
import { PetProvider } from './context/PetContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <PetProvider>
      <div className="min-h-screen flex justify-center items-start pt-4 sm:pt-8 px-4">
        <HomePage />
      </div>
    </PetProvider>
  );
}

export default App;
