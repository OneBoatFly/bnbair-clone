'use strict';
const { User, Spot, Booking } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({limit:5, offset: 5});
    const spots = await Spot.findAll({limit: 10});
    const now = Date.now();

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      for (let j = 0; j < spots.length; j++) {
        const spot = spots[j];
        const startDate = 8.64e+7 * (i + j) + now;
        const endDate = 2.592e+8 + startDate;

        await Booking.create({
          spotId: spot.id,
          userId: user.id,
          startDate,
          endDate
        });

      };
    };
    
  },

  async down (queryInterface, Sequelize) {
    const users = await User.findAll({ limit: 5, offset: 5 });
    const spots = await Spot.findAll({ limit: 10 });

    const userIds = users.map(user => user.id);
    const spotIds = spots.map(spot => spot.id);

    await Booking.destroy({
      where: {
        userId: {
          [Op.in]: userIds
        },
        spotId: {
          [Op.in]: spotIds
        }
      }
    })
    // await queryInterface.bulkDelete('Bookings', {

    // }, {});
  }
};
