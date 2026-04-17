import React, { useState, useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { getShopItems, buyItem } from '../../api/pouApi';
import { usePet } from '../../hooks/usePet';
import ItemCard from './ItemCard';
import CategoryFilter from './CategoryFilter';

const ShopModal = ({ isOpen, onClose, initialCategory = '', onPurchaseSuccess }) => {
  const { pet, updatePetData } = usePet();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [buyingId, setBuyingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
      fetchItems(initialCategory);
    }
  }, [isOpen, initialCategory]);

  const fetchItems = async (cat) => {
    setLoading(true);
    try {
      const { data } = await getShopItems(cat);
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    fetchItems(cat);
  };

  const handleBuy = async (itemId) => {
    if (!pet || buyingId) return;
    setBuyingId(itemId);
    try {
      const { data } = await buyItem(pet.id, itemId);
      updatePetData(data.pet);
      onPurchaseSuccess(data.message);
    } catch (error) {
      onPurchaseSuccess(error.response?.data?.error || 'Error al comprar', 'error');
    } finally {
      setBuyingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-bg w-full max-w-lg h-[80vh] rounded-card shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">
        <header className="bg-white p-6 border-b-2 border-gray-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-fredoka text-text">Tienda de Pochi</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted" />
          </button>
        </header>

        <div className="bg-white px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <CategoryFilter 
              activeCategory={category} 
              onCategoryChange={handleCategoryChange} 
            />
            <div className="bg-accent px-4 py-1 rounded-full border-2 border-text font-bold text-sm shrink-0 ml-2">
              🪙 {pet?.coins || 0}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 font-bold text-muted">Buscando tesoros...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted italic">
              No hay ítems en esta categoría
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onBuy={handleBuy}
                  canAfford={pet && pet.coins >= item.price}
                  loading={buyingId === item.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
