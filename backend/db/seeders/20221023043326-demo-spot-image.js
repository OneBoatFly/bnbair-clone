'use strict';
const { Spot } = require('../models');
const {Op, json} = require('sequelize');

const airBnBImages = require('../SpotImagesAirBnB.json');
// []

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = await Spot.findAll({limit: 24});

    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
  
      const images = Object.values(airBnBImages[i])
      // console.log('images', images)
      for (let image of images) {
        const { url, preview } = image;
        // console.log(url, preview)
        await spot.createSpotImage({ url, preview })
      }
    }

    // for (let i = 0; i < spots.length; i++) {
    //   const spot = spots[i];
    //   let counter = 0;
    //   while (counter < i + 1) {
    //     const url = `demo.url/spot/${spot.id}/num/${counter + 1}`;
    //     const preview = (counter === 0);
    //     await spot.createSpotImage({url, preview});
    //     counter++;
    //   };
    // };

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', {
      url: {
        [Op.like]: 'demo%'
      }
    }, {});
  }
};
