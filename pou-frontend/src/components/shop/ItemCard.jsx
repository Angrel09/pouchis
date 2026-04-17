import React from 'react';
import { CATEGORY_COLORS } from '../../utils/constants';

const ItemCard = ({ item, onBuy, canAfford, loading }) => {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-card p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[item.category]}`}>
          {item.category}
        </span>
        <span className="font-bold text-text flex items-center gap-1">
          🪙 {item.price}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-fredoka text-lg text-text leading-tight">{item.name}</h3>
        <p className="text-xs text-muted leading-tight line-clamp-2">{item.description}</p>
      </div>

      <div className="flex flex-wrap gap-1 mt-auto">
        {Object.entries(item.effects).map(([stat, value]) => (
          <span key={stat} className="text-[10px] bg-gray-100 text-text px-1.5 py-0.5 rounded-md border border-gray-200">
            {stat}: +{value}
          </span>
        ))}
      </div>

      <button
        onClick={() => onBuy(item.id)}
        disabled={!canAfford || loading}
        className={`w-full py-2 rounded-xl font-bold text-sm transition-all ${
          canAfford 
            ? 'bg-secondary text-white hover:bg-opacity-90 active:scale-95' 
            : 'bg-gray-200 text-muted cursor-not-allowed'
        }`}
      >
        {loading ? 'Comprando...' : canAfford ? 'Comprar' : 'Insuficiente'}
      </button>
    </div>
  );
};

export default ItemCard;
