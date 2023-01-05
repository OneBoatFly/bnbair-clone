'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AmenitySafeties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      },
      smokeAlarm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      firstAid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      fireExtinguisher: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      bedroomDoorLock: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      co2Alarm: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AmenitySafeties');
  }
};