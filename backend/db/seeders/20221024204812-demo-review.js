'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'Test Reviews',
        stars: 1
      },
     {
       spotId: 1,
       userId: 2,
       review: 'Test Reviews',
       stars: 2
     },
     {
       spotId: 1,
       userId: 3,
       review: 'Test Reviews',
       stars: 3
     },
     {
       spotId: 2,
       userId: 1,
       review: 'Test Reviews',
       stars: 1
     },
     {
       spotId: 2,
       userId: 2,
       review: 'Test Reviews',
       stars: 4
     },     
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
