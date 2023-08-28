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
        createdAt: 2023-08-28T08:11:28.029Z',
        updatedAt: 2023-08-28T08:11:28.029Z)
      },
      {
        name: 'Jhon Doe',
        rating: 5,
        comment: 'good\n',
        createdAt: 2023-08-28T08:12:05.180Z',
        updatedAt: 2023-08-28T08:12:05.180Z)
      }
    ],
    createdAt: 2023-08-28T08:10:04.522Z',
    updatedAt: 2023-08-28T08:12:05.0Z',
  },
];

for (let i = 0; i < 19; i++) {
  const randomProduct = {
    name: 'Product ' + (i + 2),
    image: '/images/playstation.jpg',
    brand: 'Brand ' + (i + 2),
    category: 'Category ' + (i + 2),
    description: 'Description for Product ' + (i + 2),
    rating: Math.floor(Math.random() * 5) + 1,
    numReviews: Math.floor(Math.random() * 50),
    price: (Math.random() * 500 + 100).toFixed(2),
    countInStock: Math.floor(Math.random() * 50),
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  products.push(randomProduct);
}

console.log(products);
