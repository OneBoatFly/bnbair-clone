'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const {User} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let counter = 0;

    while (counter < 10) {
      const username = `DemoUser${counter + 1}`;
      const email = `user${counter + 1}@demo.com`;
      const firstName = `DemoFirst ${counter}`;
      const lastName = `DemoLast ${counter}`;
      const hashedPassword = bcrypt.hashSync('password');
      await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword
      });
      counter++;
    }

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.like]: 'DemoUser%'
      }
    }, {});
  }
};
