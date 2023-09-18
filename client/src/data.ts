import { Store } from "./app/shared/models/Store";
import { Tag } from "./app/shared/models/Tag";

export const sample_stores: Store[] = [
  {
    id: '1',
    name: '14 Hands Chardonnays',
    time: '10:20',
    price: 10,
    favorite: false,
    origins: ['italy', 'vine'],
    stars: 4.5,
    imageUrl: 'assets/vine.jpg',
    tags: ['Vine'],
    capacity: 750,

  },
  {
    id: '2',
    name: '15 Hands Chardonnay',
    price: 20,
    time: '10:20',
    favorite: true,
    origins: ['usa', 'vine'],
    stars: 4.7,
    imageUrl: 'assets/vine2.jpg',
    tags: ['Vine'],
    capacity: 750,
  },
  {
    id: '3',
    name: '18 Hands Chardonnay',
    price: 5,
    time: '10:20',
    favorite: false,
    origins: ['japan', 'beer'],
    stars: 3.5,
    imageUrl: 'assets/beer1.jpg',
    tags: ['Beer'],
    capacity: 750,
  },
  {
    id: '4',
    name: 'Coca-cola',
    price: 2,
    time: '10:20',
    favorite: true,
    origins: ['vietnam', 'soft drink'],
    stars: 3.3,
    imageUrl: 'assets/soft.jpg',
    tags: ['Soft Drinks'],
    capacity: 750,
  },
  {
    id: '5',
    name: 'Lil Mery',
    price: 11,
    time: '10:20',
    favorite: false,
    origins: ['israel', 'spirits'],
    stars: 3.0,
    imageUrl: 'assets/spri1.jpg',
    tags: ['Spirits'],
    capacity: 750,
  },
  {
    id: '6',
    name: 'Super SauRieng',
    price: 11,
    time: '10:20',
    favorite: false,
    origins: ['canada', 'Spirits'],
    stars: 3.0,
    imageUrl: 'assets/spri2.jpg',
    tags: ['Spirits'],
    capacity: 750,
  },
]

export const sample_tags: Tag[] = [
  // {name:'All', count:6, imageUrlTag: 'assets/vine2.jpg'},
  { name: 'Vine', count: 2, imageUrlTag: 'assets/spri2.jpg' },
  { name: 'Beer', count: 1, imageUrlTag: 'assets/beer1.jpg' },
  { name: 'Spirits', count: 4, imageUrlTag: 'assets/spri1.jpg' },
  { name: 'Soft Drinks', count: 2, imageUrlTag: 'assets/soft.jpg' },
]