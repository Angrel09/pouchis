import React from 'react';
import { motion } from 'framer-motion';
import { ITEM_EMOJIS } from '../../utils/constants';

const InventoryItem = ({ item, onDragStart, onDragEnd, onDrag }) => {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      onDragStart={() => onDragStart(item)}
      onDragEnd={(event, info) => onDragEnd(event, info, item)}
      onDrag={onDrag}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
      className="w-16 h-16 bg-white rounded-xl shadow-sm border-2 border-gray-100 flex items-center justify-center text-3xl cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
      title={item.name}
    >
      {ITEM_EMOJIS[item.id] || '📦'}
    </motion.div>
  );
};

export default InventoryItem;
