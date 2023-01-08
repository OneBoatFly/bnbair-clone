'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');
const spotsDetails = require('../Spot.json');
// const airBnBImages = require('../SpotImagesAirBnB.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({limit: 1, offset: 1});

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      for (let j = 0; j < spotsDetails.length; j++) {
        const spotDetail = spotsDetails[j];
        spotDetail.address = `DemoUser${user.id} ${spotDetail.address}`;

        await user.createSpot({ ownerId: user.id, ...spotDetail, isPublished: true });
      };
    };

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', {
      address: {
        [Op.like]: 'DemoUser%'
      }
    });
  }
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}