const items = [
  {
    id: "item_001",
    name: "Hamburguesa",
    category: "comida",
    description: "Una jugosa hamburguesa que llena bastante.",
    effects: { hunger: 35, health: 5, happiness: 10 },
    price: 20
  },
  {
    id: "item_002",
    name: "Pizza",
    category: "comida",
    description: "Ideal para compartir, aunque Pochi se la come solo.",
    effects: { hunger: 50, happiness: 15 },
    price: 30
  },
  {
    id: "item_003",
    name: "Manzana",
    category: "comida",
    description: "Saludable y crujiente.",
    effects: { hunger: 15, health: 10 },
    price: 5
  },
  {
    id: "item_004",
    name: "Sushi",
    category: "comida",
    description: "Comida gourmet para mascotas refinadas.",
    effects: { hunger: 40, happiness: 20 },
    price: 45
  },
  {
    id: "item_005",
    name: "Helado",
    category: "comida",
    description: "Frío y dulce, perfecto para el ánimo.",
    effects: { hunger: 10, happiness: 30 },
    price: 15
  },
  {
    id: "item_006",
    name: "Poción de Vida",
    category: "pocion",
    description: "Recupera salud instantáneamente.",
    effects: { health: 50 },
    price: 50
  },
  {
    id: "item_007",
    name: "Poción de Energía",
    category: "pocion",
    description: "Dile adiós al cansancio.",
    effects: { energy: 60 },
    price: 40
  },
  {
    id: "item_008",
    name: "Elixir Supremo",
    category: "pocion",
    description: "Una mezcla potente que restaura todo.",
    effects: { health: 30, energy: 30, happiness: 30 },
    price: 90
  },
  {
    id: "item_009",
    name: "Gorra Azul",
    category: "ropa",
    description: "Estilo deportivo para tu mascota.",
    effects: { happiness: 5 },
    price: 60
  },
  {
    id: "item_010",
    name: "Sudadera Roja",
    category: "ropa",
    description: "Para estar cómodo y a la moda.",
    effects: { happiness: 10 },
    price: 80
  },
  {
    id: "item_011",
    name: "Anteojos de Sol",
    category: "ropa",
    description: "Demasiado cool para este mundo.",
    effects: { happiness: 8 },
    price: 55
  }
];

module.exports = items;
