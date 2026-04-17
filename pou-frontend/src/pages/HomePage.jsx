import React from 'react';
import { usePet } from '../hooks/usePet';
import PetDisplay from '../components/pet/PetDisplay';
import PetStats from '../components/pet/PetStats';
import PetStatus from '../components/pet/PetStatus';
import ActionPanel from '../components/actions/ActionPanel';

const HomePage = () => {
  const { loading, error } = usePet();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 font-fredoka text-text text-xl">Cargando mascota...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center max-w-sm">
        <p className="text-primary font-bold">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary mt-4"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm gap-6 animate-in fade-in zoom-in duration-500">
      <div className="w-full flex justify-center">
        <PetStatus />
      </div>
      
      <div className="w-full bg-white rounded-card shadow-card p-4 flex flex-col items-center">
        <PetDisplay />
        <PetStats />
      </div>

      <div className="w-full mt-4">
        <ActionPanel />
      </div>
    </div>
  );
};

export default HomePage;
