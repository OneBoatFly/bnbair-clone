'use strict';

const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'DemoUser',
        email: 'demouser@example.com',
        hashedPassword: bcrypt.hashSync('DemoUser')
      },
      {
        username: 'DemoUser1',
        email: 'demouser1@example.com',
        hashedPassword: bcrypt.hashSync('DemoUser1')
      },
      {
        username: 'DemoUser2',
        email: 'demouser2@example.com',
        hashedPassword: bcrypt.hashSync('DemoUser2')
      }            
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['DemoUser']
      }
    }, {});
  }
};
