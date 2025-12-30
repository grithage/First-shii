
import { Product } from './types';

export const PRODUCTS: Product[] = [
  // EXPEDITION GEAR
  {
    id: '1',
    name: 'Titanium Nomad Flask',
    price: 89.00,
    description: 'Virtually indestructible titanium flask for extreme environments.',
    category: 'Expedition Gear',
    subCategory: 'Hydration',
    image: 'https://picsum.photos/seed/flask/600/600',
    rating: 4.8,
    reviews: 124
  },
  {
    id: '9',
    name: 'Summit-70 Internal Frame Pack',
    price: 320.00,
    description: '70L capacity with load-distributing carbon fiber stays.',
    category: 'Expedition Gear',
    subCategory: 'Backpacks',
    image: 'https://picsum.photos/seed/pack/600/600',
    rating: 4.9,
    reviews: 67
  },
  {
    id: '10',
    name: 'Arctic-Zero 4-Season Tent',
    price: 550.00,
    description: 'Geodesic dome design tested in 80mph winds.',
    category: 'Expedition Gear',
    subCategory: 'Shelter',
    image: 'https://picsum.photos/seed/tent/600/600',
    rating: 5.0,
    reviews: 12
  },

  // TACTICAL APPAREL
  {
    id: '2',
    name: 'Iron-Weave Tactical Shell',
    price: 249.00,
    description: 'Weatherproof outer shell made from high-tensile iron-weave polymer.',
    category: 'Tactical Apparel',
    subCategory: 'Jackets',
    image: 'https://picsum.photos/seed/jacket/600/600',
    rating: 4.9,
    reviews: 89
  },
  {
    id: '5',
    name: 'Pathfinder Wool Pullover',
    price: 135.00,
    description: 'Heavyweight merino wool for thermal regulation in the harshest tundra.',
    category: 'Tactical Apparel',
    subCategory: 'Mid-layers',
    image: 'https://picsum.photos/seed/wool/600/600',
    rating: 4.6,
    reviews: 43
  },
  {
    id: '7',
    name: 'Grit-Grip Hiking Boots',
    price: 180.00,
    description: 'Vibram-soled boots engineered for vertical climbs and loose shale.',
    category: 'Tactical Apparel',
    subCategory: 'Footwear',
    image: 'https://picsum.photos/seed/boots/600/600',
    rating: 4.8,
    reviews: 156
  },

  // SURVIVAL TOOLS
  {
    id: '3',
    name: 'Stealth-Lite EDC Knife',
    price: 120.00,
    description: 'Blacked-out carbon steel folding knife with precision ball-bearing pivot.',
    category: 'Survival Tools',
    subCategory: 'Knives',
    image: 'https://picsum.photos/seed/knife/600/600',
    rating: 4.7,
    reviews: 210
  },
  {
    id: '6',
    name: 'Obsidian Paracord Kit',
    price: 24.00,
    description: '500ft of 7-strand type III paracord with a flint-striker buckle.',
    category: 'Survival Tools',
    subCategory: 'Cordage',
    image: 'https://picsum.photos/seed/cord/600/600',
    rating: 4.9,
    reviews: 312
  },
  {
    id: '11',
    name: 'Mag-Pulse Firestarter',
    price: 45.00,
    description: 'Ferrocerium rod that works even when submerged in water.',
    category: 'Survival Tools',
    subCategory: 'Fire',
    image: 'https://picsum.photos/seed/fire/600/600',
    rating: 4.8,
    reviews: 89
  },

  // FIELD TECH
  {
    id: '4',
    name: 'Rugged Solar Bank 50K',
    price: 75.00,
    description: 'High-capacity 50,000mAh solar power bank with built-in SOS beacon.',
    category: 'Field Tech',
    subCategory: 'Power',
    image: 'https://picsum.photos/seed/solar/600/600',
    rating: 4.5,
    reviews: 56
  },
  {
    id: '8',
    name: 'Onyx Beacon Watch',
    price: 450.00,
    description: 'Analog-digital hybrid with global GPS tracking and altimeter.',
    category: 'Field Tech',
    subCategory: 'Navigation',
    image: 'https://picsum.photos/seed/watch/600/600',
    rating: 5.0,
    reviews: 28
  },
  {
    id: '12',
    name: 'Lumen-X Headlamp',
    price: 95.00,
    description: '2000 lumen output with red-light tactical mode.',
    category: 'Field Tech',
    subCategory: 'Lighting',
    image: 'https://picsum.photos/seed/lamp/600/600',
    rating: 4.7,
    reviews: 143
  },

  // HEALTH & RECOVERY
  {
    id: '13',
    name: 'Trauma-Core IFAK',
    price: 110.00,
    description: 'Individual First Aid Kit designed for battlefield-level trauma.',
    category: 'Health & Recovery',
    subCategory: 'First Aid',
    image: 'https://picsum.photos/seed/kit/600/600',
    rating: 4.9,
    reviews: 55
  },
  {
    id: '14',
    name: 'Grit-Fuel 48H Rations',
    price: 35.00,
    description: 'High-calorie dense survival bars for 48 hours of sustained activity.',
    category: 'Health & Recovery',
    subCategory: 'Nutrition',
    image: 'https://picsum.photos/seed/food/600/600',
    rating: 4.4,
    reviews: 89
  },
  {
    id: '15',
    name: 'Titan-Sleeve Knee Brace',
    price: 65.00,
    description: 'Neoprene compression with titanium lateral supports.',
    category: 'Health & Recovery',
    subCategory: 'Compression',
    image: 'https://picsum.photos/seed/brace/600/600',
    rating: 4.6,
    reviews: 72
  }
];

export const CATEGORIES = [
  {
    name: 'Expedition Gear',
    sub: ['Hydration', 'Backpacks', 'Shelter']
  },
  {
    name: 'Tactical Apparel',
    sub: ['Jackets', 'Mid-layers', 'Footwear']
  },
  {
    name: 'Survival Tools',
    sub: ['Knives', 'Cordage', 'Fire']
  },
  {
    name: 'Field Tech',
    sub: ['Power', 'Navigation', 'Lighting']
  },
  {
    name: 'Health & Recovery',
    sub: ['First Aid', 'Nutrition', 'Compression']
  }
];
