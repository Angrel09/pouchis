const items = require('../data/items');

const getAllItems = (req, res) => {
  const { category } = req.query;
  
  if (category) {
    const filteredItems = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
    return res.json(filteredItems);
  }
  
  res.json(items);
};

const getItemById = (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Ítem no encontrado" });
  res.json(item);
};

module.exports = {
  getAllItems,
  getItemById
};
