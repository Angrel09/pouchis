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

  // Aplicar efectos instantáneamente
  if (item.effects) {
    if (item.effects.hunger) pet.hunger = clamp(pet.hunger + item.effects.hunger, 0, 100);
    if (item.effects.health) pet.health = clamp(pet.health + item.effects.health, 0, 100);
    if (item.effects.energy) pet.energy = clamp(pet.energy + item.effects.energy, 0, 100);
    if (item.effects.happiness) pet.happiness = clamp(pet.happiness + item.effects.happiness, 0, 100);
  }

  res.json({
    message: `Compra exitosa: ${item.name} adquirido y usado`,
    remainingCoins: pet.coins,
    pet
  });
};

module.exports = {
  getShopItems,
  buyItem
};
