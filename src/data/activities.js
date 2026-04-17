const activities = [
  {
    id: "act_001",
    name: "Carrera de Obstáculos",
    description: "Pon a tu mascota a correr por un circuito lleno de obstáculos.",
    energyCost: 20,
    rewards: {
      coins: 30,
      happiness: 15,
      experience: 10
    },
    duration: 60
  },
  {
    id: "act_002",
    name: "Baile Loco",
    description: "Mueve el cuerpo al ritmo de la música.",
    energyCost: 15,
    rewards: {
      coins: 20,
      happiness: 25,
      experience: 8
    },
    duration: 45
  },
  {
    id: "act_003",
    name: "Pesca",
    description: "Un momento relajante frente al lago.",
    energyCost: 10,
    rewards: {
      coins: 50,
      happiness: 10,
      experience: 15
    },
    duration: 120
  },
  {
    id: "act_004",
    name: "Puzzle Mental",
    description: "Desafía la inteligencia de tu mascota.",
    energyCost: 5,
    rewards: {
      coins: 40,
      happiness: 5,
      experience: 20
    },
    duration: 90
  },
  {
    id: "act_005",
    name: "Siesta Reparadora",
    description: "Recuperar energías es fundamental.",
    energyCost: 0,
    rewards: {
      coins: 0,
      happiness: 20,
      energy: 40,
      experience: 5
    },
    duration: 300
  },
  {
    id: "act_006",
    name: "Exploración del Bosque",
    description: "Una aventura en la naturaleza salvaje.",
    energyCost: 30,
    rewards: {
      coins: 60,
      happiness: 20,
      experience: 25
    },
    duration: 180
  }
];

module.exports = activities;
