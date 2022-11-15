'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER, 
        references: {
          model: 'Spots'
        },
        onDelete: 'CASCADE'
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preview: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    // await queryInterface.addIndex('SpotImages', {
    //   fields: ['spotId', 'url'],
    //   unique: true,
    //   name: 'uniqueSpotImage'
    // })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpotImages');
    await queryInterface.removeIndex('SpotImages', 'uniqueSpotImage');
  }
};