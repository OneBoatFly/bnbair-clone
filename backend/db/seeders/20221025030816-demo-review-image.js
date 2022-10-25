'use strict';
const { Review } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const reviews = await Review.findAll({limit: 10});
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      let count = 0;
      while (count < i + 1) {
        const url = `demo.url/review/${review.id}/num/${count + 1}`;
        await review.createReviewImage({url});
        count++;
      };
    };
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', {
      url: {
        [Op.like]: 'demo%'
      }
    }, {});
  }
};
