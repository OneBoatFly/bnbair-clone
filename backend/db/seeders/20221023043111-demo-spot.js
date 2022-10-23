'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Spots', [
     {
       "ownerId": 1,
       "address": "aaa123 Disney Lane",
       "city": "San Francisco",
       "state": "California",
       "country": "United States of America",
       "lat": 37.7645358,
       "lng": -122.4730327,
       "name": "App Academy",
       "description": "Place where web developers are created",
       "price": 123
     },
     {
       "ownerId": 1, 
      "address": "aaa1234566 Disney Lane",
       "city": "San Francisco",
       "state": "California",
       "country": "United States of America",
       "lat": 37.76455658,
       "lng": -122.46570327,
       "name": "App Academy222",
       "description": "Place where web developers are created",
       "price": 163
     },
     {
       "ownerId": 2, 
      "address": "234566 Disney Lane",
       "city": "San Francisco",
       "state": "California",
       "country": "United States of America",
       "lat": 37.7645758,
       "lng": -122.4656327,
       "name": "Academy222",
       "description": "Place where web developers are created",
       "price": 163
     },     
   ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
