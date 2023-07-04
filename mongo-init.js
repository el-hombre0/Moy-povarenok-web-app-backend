// db = db.getSiblingDB('admin');
db = db.getSiblingDB('moy-povarenok');

db.createUser({
  user: 'user',
  pwd: 'user',
  roles: [
    {
      role: 'dbOwner',
      db: 'moy-povarenok',
    },
  ],
});

db.auth('user', 'user');


db.createCollection('users');
db.users.insertOne({
  _id: ObjectId("64a4366314c2c66ad5379a53"),
  fullName: 'Антон Валуев',
  email: 'valueva@mail.com',
  passwordHash: '$2b$10$USZz5tCUcjjL/IGPZk.qzOQ4DRVU0X7CtUThwZOf8QMBULEDGPbIW', //1q2w3e4r
  roles: [ 'USER', 'ADMIN' ],
  createdAt: ISODate("2023-07-04T15:10:27.297Z"),
  updatedAt: ISODate("2023-07-04T15:10:27.297Z"),
  __v: 0
})


db.createCollection('dishes');
db.createCollection('roles');
db.roles.insertMany([
  { _id: ObjectId("64a4366314c2c66ad5379a4e"), value: 'USER', __v: 0 },
  { _id: ObjectId("64a4366314c2c66ad5379a4f"), value: 'ADMIN', __v: 0 }
])
// db.users.insertMany([{
//   fullName: 'Иванов Иван',
//   email: 'ivanov@mail.ru',
//   passwordHash: '',
//   avatarUrl: '',
//   roles: [],
// }])