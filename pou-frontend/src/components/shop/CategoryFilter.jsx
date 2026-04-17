import React from 'react';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: '', label: 'Todos' },
    { id: 'comida', label: 'Comida' },
    { id: 'pocion', label: 'Pociones' },
    { id: 'ropa', label: 'Ropa' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border-2 ${
            activeCategory === cat.id
              ? 'bg-primary border-primary text-white'
              : 'bg-white border-gray-100 text-muted hover:border-primary hover:text-primary'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
