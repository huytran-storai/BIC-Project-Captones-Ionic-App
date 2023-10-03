import { Store } from "./app/shared/models/Store";
import { Tag } from "./app/shared/models/Tag";
import { News } from "./app/shared/models/News";
export const sample_stores: Store[] = [
  {
    id: '1',
    name: 'Champagne Dom Perignon Vintage 2008',
    originalPrice: 20,
    price: 10,
    stars: 4.5,
    imageUrl: 'assets/vine.jpg',
    tags: ['Vine'],
    unitCapitity: 12.6,
    unitPrice: 2.97,
    Upc: '0026033748472',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 1',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '2',
    name: '14 Hands Winery Selfpoint',
    originalPrice: 30,
    price: 20,
    stars: 4.7,
    imageUrl: 'assets/vine2.jpg',
    tags: ['Vine'],
    unitCapitity: 14.5,
    unitPrice: 2.55,
    Upc: '0026033564321',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 2',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '3',
    name: 'Beer Corona Extra',
    originalPrice: 15,
    price: 5,
    stars: 3.5,
    imageUrl: 'assets/beer1.jpg',
    tags: ['Beer'],
    unitCapitity: 12.5,
    unitPrice: 2.32,
    Upc: '0026033123321',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 3',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '4',
    name: 'Chimay Doree Gold',
    originalPrice: 22,
    price: 11,
    stars: 3.3,
    imageUrl: 'assets/beer2.jpg',
    tags: ['Beer'],
    unitCapitity: 10.5,
    unitPrice: 2.10,
    Upc: '0026033456789',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 4',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '5',
    name: 'Mad River Distillers Bourbon',
    originalPrice: 22,
    price: 11,
    stars: 3.0,
    imageUrl: 'assets/spri1.jpg',
    tags: ['Whiskey'],
    unitCapitity: 11.5,
    unitPrice: 2.11,
    Upc: '0026033159753',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 5',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '6',
    name: 'Lyres Dry London Spirit',
    originalPrice: 25,
    price: 15,
    stars: 3.0,
    imageUrl: 'assets/spri2.jpg',
    tags: ['whiskey'],
    unitCapitity: 14.3,
    unitPrice: 2.33,
    Upc: '0026033456852',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 6',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '7',
    name: 'GIN BOMBAY SAPPHIRE',
    originalPrice: 28,
    price: 14,
    stars: 3.0,
    imageUrl: 'assets/bombay.jpg',
    tags: ['Spririts & Liqueur'],
    unitCapitity: 12.3,
    unitPrice: 2.14,
    Upc: '0026033482159',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 7',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
  {
    id: '8',
    name: 'VODKA DANZKA',
    originalPrice: 30,
    price: 15,
    stars: 3.0,
    imageUrl: 'assets/danzka.jpg',
    tags: ['Spririts & Liqueur'],
    unitCapitity: 13.1,
    unitPrice: 2.28,
    Upc: '0026033197536',
    Descriptions: 'Brisket',
    address: 'Located in Aisle 8',
    promotions: '2 deals available',
    added: false,
    addedSugar: false
  },
]

export const sample_tags: Tag[] = [
  // {name:'All', count:6, imageUrlTag: 'assets/vine2.jpg'},
  { name: 'Vine', count: 2, imageUrlTag: 'assets/spri2.jpg' },
  { name: 'Beer', count: 1, imageUrlTag: 'assets/beer1.jpg' },
  { name: 'Whiskey', count: 4, imageUrlTag: 'assets/spri1.jpg' },
  { name: 'Spririts & Liqueur', count: 2, imageUrlTag: 'assets/bombay.jpg' },
]

export const sample_news: News[] = [
  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

]