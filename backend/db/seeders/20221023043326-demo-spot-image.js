'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        "spotId": 1,
        "url": "image.url/1",
        "preview": "true",
      },
      {
        "spotId": 1,
        "url": "image.url/2",
        "preview": "false",
      },
      {
        "spotId": 2,
        "url": "image.url/1",
        "preview": "true",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
