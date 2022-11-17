'use strict';
const { User, Spot, Review } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({limit: 5, offset: 0});
    const spots = await Spot.findAll({limit: 24});

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      for (let j = 0; j < spots.length; j++) {
        const spot = spots[j];
        const review = `DemoReview from user: ${user.id} for spot: ${spot.id}, DemoReview from user: ${user.id} for spot: ${spot.id}, DemoReview from user: ${user.id} for spot: ${spot.id}`;
        const stars = getRandomIntInclusive(1, 5);
        await Review.create({
          spotId: spot.id,
          userId: user.id,
          review,
          stars
        });
      };
    };

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', {
      review: {
        [Op.like]: 'DemoReview%'
      }
    }, {});
  }
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
  // The maximum is inclusive and the minimum is inclusive
}