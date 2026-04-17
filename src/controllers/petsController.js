let pets = require('../data/pets');
const items = require('../data/items');

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const checkLevelUp = (pet) => {
  while (pet.experience >= 100) {
    pet.experience -= 100;
    pet.level += 1;
    console.log(`${pet.name} ha subido al nivel ${pet.level}!`);
  }
};

const updateStatus = (pet) => {
  if (pet.health <= 0) {
    pet.status = "critical";
  } else {
    pet.status = "healthy";
  }
};

const updateQuestProgress = (pet, questId) => {
  const quest = pet.quests.find(q => q.id === questId);
  if (quest && !quest.completed) {
    quest.progress += 1;
    if (quest.progress >= quest.goal) {
      quest.completed = true;
      pet.coins += quest.reward;
    }
  }
};

const getAllPets = (req, res) => {
  res.json(pets);
};

const getPetById = (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });
  res.json(pet);
};

const createPet = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

  const newPet = {
    id: `pet_${Date.now()}`,
    name,
    level: 1,
    experience: 0,
    health: 100,
    hunger: 100,
    energy: 100,
    happiness: 100,
    coins: 100,
    inventory: [],
    status: "healthy",
    createdAt: new Date().toISOString()
  };

  pets.push(newPet);
  res.status(201).json(newPet);
};

const updatePet = (req, res) => {
  const index = pets.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Mascota no encontrada" });

  pets[index] = { ...pets[index], ...req.body, id: pets[index].id }; // Protegemos el ID
  res.json(pets[index]);
};

const deletePet = (req, res) => {
  const index = pets.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Mascota no encontrada" });

  const deletedPet = pets.splice(index, 1);
  res.json({ message: "Mascota eliminada", pet: deletedPet[0] });
};

const feedPet = (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });

  const { purchaseId } = req.body;
  const itemIndex = pet.inventory.findIndex(i => i.purchaseId === purchaseId);

  if (itemIndex === -1) return res.status(404).json({ error: "Ítem no encontrado en el inventario" });
  
  const item = pet.inventory[itemIndex];

  if (item.category !== 'comida' && item.category !== 'pocion') {
    return res.status(400).json({ error: "Este ítem no se puede ingerir" });
  }

  // Aplicar efectos
  if (item.effects) {
    if (item.effects.hunger) pet.hunger = clamp(pet.hunger + item.effects.hunger, 0, 100);
    if (item.effects.health) pet.health = clamp(pet.health + item.effects.health, 0, 100);
    if (item.effects.energy) pet.energy = clamp(pet.energy + item.effects.energy, 0, 100);
    if (item.effects.happiness) pet.happiness = clamp(pet.happiness + item.effects.happiness, 0, 100);
  }

  // Eliminar del inventario
  pet.inventory.splice(itemIndex, 1);

  // Misión: Alimenta a tu mascota
  if (item.category === 'comida') {
    updateQuestProgress(pet, 'q1');
  }

  updateStatus(pet);
  res.json({ message: `${pet.name} ha consumido ${item.name}`, pet });
};

const equipItem = (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });

  const { purchaseId } = req.body;
  const item = pet.inventory.find(i => i.purchaseId === purchaseId);

  if (!item) return res.status(404).json({ error: "Ítem no encontrado en el inventario" });
  if (item.category !== 'ropa') return res.status(400).json({ error: "Este ítem no es equipable" });

  const slot = item.id === 'item_009' ? 'hat' : item.id === 'item_011' ? 'glasses' : 'clothes';
  
  // Si ya está equipado, lo quitamos. Si no, lo ponemos.
  if (pet.equipped[slot] && pet.equipped[slot].purchaseId === purchaseId) {
    delete pet.equipped[slot];
    res.json({ message: `${item.name} desequipado`, pet });
  } else {
    pet.equipped[slot] = item;
    res.json({ message: `${item.name} equipado`, pet });
  }
};

const playPet = (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });

  if (pet.energy < 10) {
    return res.status(400).json({ error: "Demasiado cansado para jugar" });
  }

  pet.energy = clamp(pet.energy - 10, 0, 100);
  pet.happiness = clamp(pet.happiness + 20, 0, 100);
  pet.experience += 15;

  // Misión: Juega minijuegos
  updateQuestProgress(pet, 'q2');

  checkLevelUp(pet);
  res.json({ message: `${pet.name} se ha divertido mucho jugando`, pet });
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  feedPet,
  playPet
};
