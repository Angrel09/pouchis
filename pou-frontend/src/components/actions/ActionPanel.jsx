import React, { useState } from 'react';
import ActionButton from './ActionButton';
import { playActivity } from '../../api/pouApi';
import { usePet } from '../../hooks/usePet';
import { useToast } from '../../hooks/useToast';
import Toast from '../ui/Toast';
import ShopModal from '../shop/ShopModal';

const ActionPanel = () => {
  const { pet, updatePetData } = usePet();
  const { toast, showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState('');

  const handleAction = async (activityId, label) => {
    if (!pet || loading) return;
    setLoading(true);
    try {
      const { data } = await playActivity(activityId, pet.id);
      updatePetData(data.pet);
      showToast(data.message);
    } catch (error) {
      showToast(error.response?.data?.error || 'Error al realizar la acción', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openShop = (category = '') => {
    setShopCategory(category);
    setShopOpen(true);
  };

  const handlePurchaseSuccess = (message, type = 'success') => {
    showToast(message, type);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon="🍔" 
          label="Alimentar" 
          color="green" 
          onClick={() => openShop('comida')}
        />
        <ActionButton 
          icon="🎮" 
          label="Jugar" 
          color="orange" 
          onClick={() => handleAction('act_002', 'Baile Loco')}
          disabled={loading}
        />
        <ActionButton 
          icon="😴" 
          label="Dormir" 
          color="blue" 
          onClick={() => handleAction('act_005', 'Siesta')}
          disabled={loading}
        />
        <ActionButton 
          icon="💊" 
          label="Curar" 
          color="purple" 
          onClick={() => openShop('pocion')}
        />
      </div>

      <ShopModal 
        isOpen={shopOpen} 
        onClose={() => setShopOpen(false)} 
        initialCategory={shopCategory}
        onPurchaseSuccess={handlePurchaseSuccess}
      />

      <Toast message={toast?.message} type={toast?.type} />
    </div>
  );
};

export default ActionPanel;
