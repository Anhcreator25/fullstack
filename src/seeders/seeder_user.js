'use strict';
module.exports = {
 async up(queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Users', [
     {
       email:   'anh25@gmail.com',
       password: '123456',
       firstName: 'Teu',
       lastName: 'depzai',
       address: 'Quang binh',
       gender: 1,
       roleID: 'ROLE',
       phoneNumber: '0822173222',
       positionID: '7373',
       image: 'abcasdas',
       createAt: new Date(),
       updatedAt: new Date(),
     },
   ]);
 },
 async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('user', { email: 'example@example.com' }, {});
 }
};