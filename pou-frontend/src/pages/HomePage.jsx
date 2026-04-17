import React from 'react';
import { usePet } from '../hooks/usePet';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useToast } from '../hooks/useToast';
import { feedPet, equipPetItem } from '../api/pouApi';
import PetDisplay from '../components/pet/PetDisplay';
import PetStats from '../components/pet/PetStats';
import PetStatus from '../components/pet/PetStatus';
import ActionPanel from '../components/actions/ActionPanel';
import InventoryItem from '../components/inventory/InventoryItem';
import Toast from '../components/ui/Toast';

const HomePage = () => {
  const { pet, loading, error, updatePetData } = usePet();
  const { toast, showToast } = useToast();
  const { 
    isOverTarget, 
    onDragStart, 
    onDragEnd, 
    setIsOverTarget 
  } = useDragAndDrop();

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) return 'day';
    if (hour >= 18 && hour < 20) return 'sunset';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();

  const handleDragEnd = async (event, info, item) => {
    // Verificar si el punto final está sobre la mascota
    // Usamos id="pet-target" que pusimos en PetDisplay
    const targetElement = document.getElementById('pet-target');
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const isOver = (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      );

      if (isOver && pet) {
        try {
          if (item.category === 'ropa') {
            const { data } = await equipPetItem(pet.id, item.purchaseId);
            updatePetData(data.pet);
            showToast(data.message);
          } else {
            const { data } = await feedPet(pet.id, item.purchaseId);
            updatePetData(data.pet);
            showToast(data.message);
          }
        } catch (err) {
          console.error('Error al procesar ítem:', err);
          showToast(err.response?.data?.error || 'Error al procesar ítem', 'error');
        }
      }
    }
    setIsOverTarget(false);
  };

  const handleDragUpdate = (event, info) => {
    const targetElement = document.getElementById('pet-target');
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const isOver = (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      );
      setIsOverTarget(isOver);
    }
  };

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
    <div className={`fixed inset-0 flex flex-col items-center pt-8 px-4 overflow-y-auto pb-24 transition-all duration-1000 bg-${timeOfDay}`}>
      <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="w-full flex justify-center">
          <PetStatus />
        </div>
        
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-card shadow-card p-4 flex flex-col items-center border border-white/20">
          <PetDisplay isOverTarget={isOverTarget} />
          <PetStats />
        </div>

        {/* Inventario Rápido */}
        {pet?.inventory?.length > 0 && (
          <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-4 border-2 border-dashed border-white/50 shadow-sm">
            <h3 className={`text-sm font-bold mb-3 uppercase tracking-wider ${timeOfDay === 'night' ? 'text-gray-600' : 'text-muted'}`}>Tu Inventario</h3>
            <div className="flex flex-wrap gap-3">
              {pet.inventory.map((item) => (
                <InventoryItem 
                  key={item.purchaseId} 
                  item={item} 
                  onDragStart={() => {}} 
                  onDragEnd={handleDragEnd}
                  onDrag={handleDragUpdate}
                />
              ))}
            </div>
          </div>
        )}

        <div className="w-full mt-4 bg-white/50 backdrop-blur-sm rounded-3xl p-2">
          <ActionPanel />
        </div>
      </div>

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  );
};

export default HomePage;
