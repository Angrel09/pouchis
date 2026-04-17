const activities = require('../data/activities');
let pets = require('../data/pets');

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const checkLevelUp = (pet) => {
  while (pet.experience >= 100) {
    pet.experience -= 100;
    pet.level += 1;
    console.log(`${pet.name} ha subido al nivel ${pet.level}!`);
  }
};

const getAllActivities = (req, res) => {
  res.json(activities);
};

const getActivityById = (req, res) => {
  const activity = activities.find(a => a.id === req.params.id);
  if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
  res.json(activity);
};

const playActivity = (req, res) => {
  const { petId } = req.body;
  const activityId = req.params.id;

  const pet = pets.find(p => p.id === petId);
  const activity = activities.find(a => a.id === activityId);

  if (!pet) return res.status(404).json({ error: "Mascota no encontrada" });
  if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });

  if (pet.energy < activity.energyCost) {
    return res.status(400).json({ error: "Energía insuficiente para esta actividad" });
  }

  // Descontar energía
  pet.energy -= activity.energyCost;

  // Aplicar recompensas
  if (activity.rewards) {
    if (activity.rewards.coins) pet.coins += activity.rewards.coins;
    if (activity.rewards.happiness) pet.happiness = clamp(pet.happiness + activity.rewards.happiness, 0, 100);
    if (activity.rewards.experience) pet.experience += activity.rewards.experience;
    if (activity.rewards.energy) pet.energy = clamp(pet.energy + activity.rewards.energy, 0, 100);
  }

  // Verificar subida de nivel
  checkLevelUp(pet);

  res.json({
    message: `${pet.name} ha completado: ${activity.name}`,
    rewards: activity.rewards,
    pet
  });
};

module.exports = {
  getAllActivities,
  getActivityById,
  playActivity
};
