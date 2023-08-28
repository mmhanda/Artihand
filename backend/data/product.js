const products = [
  {
    name: 'Ultimate 4K Ultra HD Smart TV',
    image: '/images/playstation.jpg',
    brand: 'VisionTech',
    category: 'Electronics',
    description: 'Immerse yourself in a world of stunning visuals and intelligent features with the Ultimate 4K Ultra HD Smart TV from VisionTech.',
    rating: 4,
    numReviews: 2,
    price: 799.99,
    countInStock: 30,
    reviews: [
      {
        name: 'Admin User',
        rating: 3,
        comment: 'sdsd',
        createdAt: '2023-08-28T08:11:28.029Z',
        updatedAt: '2023-08-28T08:11:28.029Z'
      },
      {
        name: 'Jhon Doe',
        rating: 5,
        comment: 'good\n',
        createdAt: '2023-08-28T08:12:05.180Z',
        updatedAt: '2023-08-28T08:12:05.180Z'
      }
    ],
    createdAt: '2023-08-28T08:10:04.522Z',
    updatedAt: '2023-08-28T08:12:05.0Z',
  },
  {
    name: 'Wireless Bluetooth Earbuds',
    image: '/images/playstation.jpg',
    brand: 'AudioWave',
    category: 'Electronics',
    description: 'Experience true wireless freedom with AudioWave Wireless Bluetooth Earbuds.',
    rating: 4.6,
    numReviews: 1,
    price: 89.99,
    countInStock: 40,
    reviews: [
      {
        name: 'Lily Johnson',
        rating: 5,
        comment: 'These earbuds sound amazing and fit comfortably.',
        createdAt: '2023-08-28T09:30:00.000Z',
        updatedAt: '2023-08-28T09:30:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Professional DSLR Camera',
    image: '/images/playstation.jpg',
    brand: 'PhotoPro',
    category: 'Electronics',
    description: 'Capture stunning photos with the high-performance PhotoPro Professional DSLR Camera.',
    rating: 4.9,
    numReviews: 2,
    price: 1299.99,
    countInStock: 10,
    reviews: [
      {
        name: 'Alex Turner',
        rating: 5,
        comment: 'The image quality and features of this camera are top-notch.',
        createdAt: '2023-08-28T10:15:00.000Z',
        updatedAt: '2023-08-28T10:15:00.000Z'
      },
      {
        name: 'Sophie Miller',
        rating: 4,
        comment: 'Great camera for both beginners and professionals.',
        createdAt: '2023-08-28T11:00:00.000Z',
        updatedAt: '2023-08-28T11:00:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Compact Electric Scooter',
    image: '/images/playstation.jpg',
    brand: 'EcoRide',
    category: 'Outdoor Gear',
    description: 'Effortlessly glide through the city with the EcoRide Compact Electric Scooter.',
    rating: 4.2,
    numReviews: 1,
    price: 299.99,
    countInStock: 8,
    reviews: [
      {
        name: 'William Carter',
        rating: 4,
        comment: 'This scooter is a fun and eco-friendly way to commute.',
        createdAt: '2023-08-28T12:30:00.000Z',
        updatedAt: '2023-08-28T12:30:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Premium Fitness Tracker',
    image: '/images/playstation.jpg',
    brand: 'FitTech',
    category: 'Fitness',
    description: 'Monitor your health and track your workouts with the FitTech Premium Fitness Tracker.',
    rating: 4.7,
    numReviews: 2,
    price: 79.99,
    countInStock: 15,
    reviews: [
      {
        name: 'Emma Wilson',
        rating: 5,
        comment: 'Accurate tracking and comfortable to wear.',
        createdAt: '2023-08-28T13:45:00.000Z',
        updatedAt: '2023-08-28T13:45:00.000Z'
      },
      {
        name: 'James Miller',
        rating: 4,
        comment: 'Helpful for staying motivated and setting fitness goals.',
        createdAt: '2023-08-28T14:30:00.000Z',
        updatedAt: '2023-08-28T14:30:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Stainless Steel French Press',
    image: '/images/playstation.jpg',
    brand: 'BrewMaster',
    category: 'Kitchen Appliances',
    description: 'Brew rich and aromatic coffee with the BrewMaster Stainless Steel French Press.',
    rating: 4.5,
    numReviews: 1,
    price: 39.99,
    countInStock: 20,
    reviews: [
      {
        name: 'Olivia Davis',
        rating: 5,
        comment: 'Love the quality of the coffee this French press produces.',
        createdAt: '2023-08-28T15:15:00.000Z',
        updatedAt: '2023-08-28T15:15:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Smart Home Security Camera',
    image: '/images/playstation.jpg',
    brand: 'SecureGuard',
    category: 'Home Security',
    description: 'Keep an eye on your home with the SecureGuard Smart Home Security Camera.',
    rating: 4.8,
    numReviews: 1,
    price: 129.99,
    countInStock: 12,
    reviews: [
      {
        name: 'Aiden White',
        rating: 4,
        comment: 'Easy setup and reliable performance.',
        createdAt: '2023-08-28T16:45:00.000Z',
        updatedAt: '2023-08-28T16:45:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Portable Bluetooth Speaker',
    image: '/images/playstation.jpg',
    brand: 'SoundBeat',
    category: 'Electronics',
    description: 'Enjoy your favorite tunes on the go with the SoundBeat Portable Bluetooth Speaker.',
    rating: 4.4,
    numReviews: 2,
    price: 59.99,
    countInStock: 18,
    reviews: [
      {
        name: 'Liam Anderson',
        rating: 5,
        comment: 'Impressive sound quality and long battery life.',
        createdAt: '2023-08-28T17:30:00.000Z',
        updatedAt: '2023-08-28T17:30:00.000Z'
      },
      {
        name: 'Ava Brown',
        rating: 4,
        comment: 'Compact and easy to carry around.',
        createdAt: '2023-08-28T18:15:00.000Z',
        updatedAt: '2023-08-28T18:15:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  },
  {
    name: 'Outdoor Camping Tent',
    image: '/images/playstation.jpg',
    brand: 'WildGear',
    category: 'Outdoor Gear',
    description: 'Experience the great outdoors with the WildGear Outdoor Camping Tent.',
    rating: 4.2,
    numReviews: 1,
    price: 149.99,
    countInStock: 5,
    reviews: [
      {
        name: 'Noah Adams',
        rating: 4,
        comment: 'Durable and easy to set up.',
        createdAt: '2023-08-28T19:30:00.000Z',
        updatedAt: '2023-08-28T19:30:00.000Z'
      }
    ],
    createdAt: '2023-08-28T09:30:00.000Z',
    updatedAt: '2023-08-28T09:30:00.000Z'
  }
];

export default products;