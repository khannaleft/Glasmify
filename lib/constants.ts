import type { Product } from './types';

// NOTE: This data should be uploaded to your Firestore 'products' collection.
// The app will fetch data from Firestore, not from this file.
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Astro-Tech Hoodie',
    price: 89.99,
    description: 'A comfortable and stylish hoodie made with advanced fabric technology. Perfect for cool evenings and casual outings. Features a minimalist design with a futuristic touch.',
    category: 'Apparel',
    imageUrl: 'https://picsum.photos/seed/techhoodie/800/800',
    rating: 4.5,
    reviews: [
      { id: 'review1', author: 'Alex', rating: 5, comment: 'Incredibly comfortable and looks amazing!', date: '2023-10-15' },
      { id: 'review2', author: 'Jordan', rating: 4, comment: 'Great fit, but the material could be a bit thicker.', date: '2023-10-12' },
    ],
    stock: 15,
  },
  {
    id: '2',
    name: 'Cyber-Shade Glasses',
    price: 129.99,
    description: 'Sleek sunglasses with polarized lenses and a lightweight frame. Offers 100% UV protection with a cyberpunk aesthetic. The future is bright, shield your eyes.',
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/seed/cybershades/800/800',
    rating: 4.8,
    reviews: [
        { id: 'review3', author: 'Casey', rating: 5, comment: 'Best shades I\'ve ever owned. Super stylish.', date: '2023-11-01' },
    ],
    stock: 25,
  },
  {
    id: '3',
    name: 'Gravity-Defy Sneakers',
    price: 199.99,
    description: 'Experience unparalleled comfort with our Gravity-Defy sneakers. Featuring responsive cushioning and a breathable upper, these shoes are perfect for both athletic and casual wear.',
    category: 'Footwear',
    imageUrl: 'https://picsum.photos/seed/gravitysneakers/800/800',
    rating: 4.7,
    reviews: [
      { id: 'review4', author: 'Taylor', rating: 5, comment: 'Like walking on clouds. Highly recommend!', date: '2023-09-20' },
      { id: 'review5', author: 'Riley', rating: 4, comment: 'Very comfortable, but they run a half size small.', date: '2023-09-18' },
    ],
    stock: 10,
  },
  {
    id: '4',
    name: 'Quantum Data Watch',
    price: 349.99,
    description: 'A smartwatch that combines classic design with modern technology. Track your fitness, receive notifications, and customize your watch face. Connects seamlessly with your devices.',
    category: 'Gadgets',
    imageUrl: 'https://picsum.photos/seed/quantumwatch/800/800',
    rating: 4.2,
    reviews: [
        { id: 'review6', author: 'Morgan', rating: 4, comment: 'Great features, but battery life could be better.', date: '2023-10-05' },
    ],
    stock: 8,
  },
  {
    id: '5',
    name: 'Starlight Projector',
    price: 79.99,
    description: 'Transform your room into a galaxy with this mesmerizing starlight projector. Multiple color settings and modes to create the perfect ambiance for relaxation or parties.',
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/starlight/800/800',
    rating: 4.9,
    reviews: [
      { id: 'review7', author: 'Sam', rating: 5, comment: 'Absolutely magical. My kids love it!', date: '2023-11-10' },
      { id: 'review8', author: 'Devin', rating: 5, comment: 'Creates such a relaxing atmosphere.', date: '2023-11-08' },
    ],
    stock: 30,
  },
  {
    id: '6',
    name: 'Echo-Cancellation Headphones',
    price: 249.99,
    description: 'Immerse yourself in pure audio with our noise-cancelling headphones. Crystal-clear sound, long battery life, and plush earcups for maximum comfort.',
    category: 'Gadgets',
    imageUrl: 'https://picsum.photos/seed/echoheadphones/800/800',
    rating: 4.6,
    reviews: [
        { id: 'review9', author: 'Chris', rating: 5, comment: 'The noise cancellation is top-notch.', date: '2023-08-25' },
    ],
    stock: 12,
  },
    {
    id: '7',
    name: 'Urban Explorer Backpack',
    price: 119.99,
    description: 'A durable and water-resistant backpack designed for the modern commuter. Multiple compartments, including a padded laptop sleeve, keep your gear organized and protected.',
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/seed/urbanbackpack/800/800',
    rating: 4.8,
    reviews: [
        { id: 'review10', author: 'Pat', rating: 5, comment: 'Perfect for my daily commute. Fits everything I need.', date: '2023-10-22' },
    ],
    stock: 18,
  },
  {
    id: '8',
    name: 'Kinetic Desk Sculpture',
    price: 59.99,
    description: 'A fascinating kinetic sculpture that provides a calming and mesmerizing motion. A perfect addition to any desk or workspace to inspire creativity and focus.',
    category: 'Home',
    imageUrl: 'https://picsum.photos/seed/kineticsculpture/800/800',
    rating: 4.4,
    reviews: [
        { id: 'review11', author: 'Jamie', rating: 4, comment: 'Looks great on my desk. A bit smaller than I expected.', date: '2023-09-30' },
    ],
    stock: 22,
  },
];
