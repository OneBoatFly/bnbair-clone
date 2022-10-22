'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 6,
        url: 'https://www.image.com/1',
        preview: true,
      },
      {
        spotId: 2,
        url: "https://www.image.com/2",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://www.image.com/3",
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://www.image.com/4',
        preview: true,
      },
      {
        spotId: 3,
        url: "https://www.image.com/5",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://www.image.com/6",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://www.image.com/7",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://www.image.com/8",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://www.image.com/9",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://www.image.com/10",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://www.image.com/11",
        preview: false,
      }                   
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
