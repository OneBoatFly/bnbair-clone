'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AmenityBasics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      },
      wifi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      tv: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      kitchen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      washer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      freeParking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      paidParking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      airConditioning: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dedicatedWorkspace: {
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
    await queryInterface.dropTable('AmenityBasics');
  }
};