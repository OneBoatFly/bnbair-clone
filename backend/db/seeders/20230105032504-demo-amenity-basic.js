'use strict';
const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = await Spot.findAll();
    
    for (let i = 0; i < spots.length; i++) {
      const amenityB = {
        wifi: Math.random() < 0.5,
        tv: Math.random() < 0.5,
        kitchen: Math.random() < 0.5,
        washer: Math.random() < 0.5,
        freeParking: Math.random() < 0.5,
        paidParking: Math.random() < 0.5,
        airConditioning: Math.random() < 0.5,
        dedicatedWorkspace: Math.random() < 0.5
      }

      const amenityS = {
        pool: Math.random() < 0.5,
        hotTub: Math.random() < 0.5,
        patio: Math.random() < 0.5,
        bbqGrill: Math.random() < 0.5,
        outdoorDining: Math.random() < 0.5,
        Firepit: Math.random() < 0.5,
        poolTable: Math.random() < 0.5,
        indoorFireplace: Math.random() < 0.5,
        piano: Math.random() < 0.5,
        exerciseEquipment: Math.random() < 0.5,
        lakeAccess: Math.random() < 0.5,
        beachAccess: Math.random() < 0.5,
        skiInOut: Math.random() < 0.5,
        outdoorShow: Math.random() < 0.5
      }

      const amenitySafety = {
        smokeAlarm: Math.random() < 0.5,
        firstAid: Math.random() < 0.5,
        fireExtinguisher: Math.random() < 0.5,
        bedroomDoorLock: Math.random() < 0.5,
        co2Alarm: Math.random() < 0.5
      }

      const spot = spots[i];
      await spot.createAmenityBasic({ id: spot.id, ...amenityB });
      await spot.createAmenityStandout({ id: spot.id, ...amenityS });
      await spot.createAmenitySafety({ id: spot.id, ...amenitySafety });
    };

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AmenityBasics', null, {});
    await queryInterface.bulkDelete('AmenityStandouts', null, {});
  }
};
