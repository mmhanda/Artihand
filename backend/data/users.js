import bcrypt from "bcryptjs";

const usersData = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('12345', 2),
    isAdmin: true,
  },
  {
    name: 'Jhon Doe',
    email: 'user1@email.com',
    password: bcrypt.hashSync('12345', 2),
    isAdmin: false,
  },
  {
    name: 'Smith Doe',
    email: 'user2@email.com',
    password: bcrypt.hashSync('12345', 2),
    isAdmin: false,
  },
  {
    name: 'Kayel Dayel',
    email: 'user3@email.com',
    password: bcrypt.hashSync('12345', 2),
    isAdmin: false,
  },
  {
    name: 'Daniel Doe',
    email: 'user4@email.com',
    password: bcrypt.hashSync('12345', 2),
    isAdmin: false,
  },
];

export default usersData;