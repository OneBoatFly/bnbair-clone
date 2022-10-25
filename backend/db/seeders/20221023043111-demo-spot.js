'use strict';
const { Op } = require('sequelize');
const { User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({limit: 5});
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let counter = 0;
      while (counter < i + 1) {
        const address = `DemoUser: ${user.id} DemoProperty: ${counter + 1}`;
        const city = 'Test City';
        const state = 'Test State';
        const country = 'Test Country';
        const lat = Math.round(getRandomArbitrary(-90, 90) * 100000) / 100000;
        const lng = Math.round(getRandomArbitrary(-180, 180) * 100000) / 100000;
        const name = 'Test Name';
        const description = 'Test Description';
        const price = (counter + 1) * 99;

        await user.createSpot({ownerId: user.id, address, city, state, country, lat, lng, name, description, price});
        counter++;
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