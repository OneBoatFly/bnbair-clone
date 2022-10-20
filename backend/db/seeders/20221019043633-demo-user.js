'use strict';

const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'DemoUser',
        email: 'demouser@example.com',
        firstName: 'DemoUserF',
        lastName: 'DemoUserL',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'DemoUser1',
        email: 'demouser1@example.com',
        firstName: 'DemoUser1F',
        lastName: 'DemoUser1L',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'DemoUser2',
        email: 'demouser2@example.com',
        firstName: 'DemoUser2F',
        lastName: 'DemoUser2L',        
        hashedPassword: bcrypt.hashSync('password')
      }            
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['DemoUser', 'DemoUser1', 'DemoUser2']
      }
    }, {});
  }
};
