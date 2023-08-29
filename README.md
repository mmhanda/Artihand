# ProShop eCommerce Platform
### eCommerce platform built with the MERN stack & Redux/Toolkit.

![Screenshot](https://cdn.discordapp.com/attachments/1116486168771559435/1146048303931334717/Screenshot_from_2023-08-29_12-45-44.png)
## Table of Contents

- [Features](#features)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Install Dependencies](#install-dependencies)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)
- [Users To Test](#sample-user-logins)
## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Environment Variables

Rename the `.env.example` file to `.env` and add the following:

- NODE_ENV = development
- PORT = 5000
- MONGO_URI = your mongodb uri
- PAYPAL_CLIENT_ID = your paypal client id
- JWT_SECRET = 'abc123'
- PAGINATION_LIMIT = 8


Change the `JWT_SECRET` and `PAGINATION_LIMIT` to your preferences.

### Install Dependencies

```bash
cd Artihand
npm install
```

### Run
```bash
# Run frontend (:3000) And backend (:5000)
npm run dev

# Run backend only
npm run server
```
### Build & Deploy

```bash
npm run build

# For starting the app on localhost:5000
npm start
```
### Seed Database
- Use the following commands to seed the database with sample users and products or destroy all data:
```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

### Sample User Logins

john@email.com (Customer)
- Password: 12345

jane@email.com (Customer)
- Password: 12345

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request. Please follow the project's code of conduct.

## Acknowledgements

Special thanks to the open-source community for providing valuable tools and resources that make projects like this possible.

## Contact

For any questions or inquiries, you can reach out to me at [mohammedhanda109@gmail.com](mailto:mohammedhanda109@gmail.com).

Connect with me on [LinkedIn](https://www.linkedin.com/in/mohammed-handa-b5392024b/)

## About the Author

Hi there! I'm mohammed, a passionate web developer and technology enthusiast. With a love for creating user-friendly and visually appealing web applications, I embarked on this journey to build the ProShop eCommerce Platform. This project allowed me to explore the exciting world of the MERN stack and gain practical experience in building scalable and feature-rich applications.

When I'm not coding, you can find me enjoying a good cup of coffee, exploring the latest trends in technology.  I'm always eager to learn and share my knowledge with the community.


**[Back to Top](#proshop-ecommerce-platform)**
