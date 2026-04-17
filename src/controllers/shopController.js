const items = require('../data/items');
let pets = require('../data/pets');

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const getShopItems = (req, res) => {
  res.json({
    shopId: "main_shop",
    name: "Tienda de Pochi",
    availableItems: items,
    lastUpdated: new Date().toISOString()
  });
};

const buyItem = (req, res) => {
  const { petId, itemId } = req.body;
  
  const pet = pets.find(p => p.id === petId);
  const item = items.find(i => i.id === itemId);

  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });
  if (!item) return res.status(404).json({ error: "Ítem no encontrado" });

  if (pet.coins < item.price) {
    return res.status(400).json({ error: "Monedas insuficientes" });
  }

  // Descontar monedas
  pet.coins -= item.price;

  // Si es ropa, se podría equipar o guardar. Si es consumible, al inventario.
  // Por ahora, todo al inventario para permitir Drag & Drop.
  pet.inventory.push({ ...item, purchaseId: Date.now() });

  res.json({
    message: `Has comprado ${item.name}. ¡Ahora está en tu inventario!`,
    remainingCoins: pet.coins,
    pet
  });
};

module.exports = {
  getShopItems,
  buyItem
};
