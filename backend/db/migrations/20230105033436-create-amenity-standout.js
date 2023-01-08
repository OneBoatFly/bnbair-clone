'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AmenityStandouts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      },
      pool: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hotTub: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      patio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      bbqGrill: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      outdoorDining: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      Firepit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      poolTable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      indoorFireplace: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      piano: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      exerciseEquipment: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lakeAccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      beachAccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      skiInOut: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      outdoorShow: {
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
    await queryInterface.dropTable('AmenityStandouts');
  }
};