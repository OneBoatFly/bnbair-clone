'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const {User} = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await User.create({
      username: 'Yizhou',
      email: 'demo.user@example.com',
      firstName: 'Yizhou',
      lastName: 'Zhang',
      hashedPassword: bcrypt.hashSync('password'),
      profileUrl: 'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-yizhou.png?alt=media&token=24090b77-6c6b-4a0c-9506-f81e834476ae'
    });

    const NAMES = ['Rachel', 'Monica', 'Phoebe', 'Joey', 'Chandler', 'Ross']
    const PROFILES = [
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-rachel.png?alt=media&token=0605bbe6-3987-4ada-b875-ddf4bc65416f',
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-monica.png?alt=media&token=53bfe2a2-fd5c-489f-b957-bdce631cc066',
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-pheobe.png?alt=media&token=b6d51729-02de-41e5-8eae-14170ae400d1',
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-joey.png?alt=media&token=01cda767-3cf5-47fb-a048-9b466a9c4a2e',
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-chandler.png?alt=media&token=fa36bcc3-dde5-4ca8-a2c5-e5cdf91fec8f',
      'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/profiles%2Fprofile-ross.png?alt=media&token=e3f3898f-6978-4771-9728-284d2540eb3f'
    ]

    let counter = 0;
    while (counter < 6) {
      const username = NAMES[counter];
      const email = `${NAMES[counter].toLocaleLowerCase()}@demo.com`;
      const firstName = NAMES[counter];
      const lastName = `DemoLast ${counter}`;
      const hashedPassword = bcrypt.hashSync('password');
      const profileUrl = PROFILES[counter];
      await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword,
        profileUrl
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
