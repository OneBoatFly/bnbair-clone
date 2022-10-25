'use strict';
const { User, Spot, Booking } = require('../models');
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await User.findAll({limit:5, offset: 5});
    const spots = await Spot.findAll({limit:5});

    for (let spot of spots) {
      let now = Date.now();
      for (let user of users) {
        const startDate = 8.64e+7 * 3 + now;
        const endDate = 2.592e+8 + startDate;
        now = endDate;

        await Booking.create({
          spotId: spot.id,
          userId: user.id,
          startDate,
          endDate
        });
      };
    };

    for (let spot of spots) {
      let now = Date.now();
      for (let user of users) {
        const endDate = now - 8.64e+7 * 3;
        const startDate = endDate - 2.592e+8;
        now = startDate;

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
