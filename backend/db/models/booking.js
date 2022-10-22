'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Booking.belongsTo(models.Spot, {foreignKey: 'userId'});
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isAfterStartDate(value) {
          if (value < this.startDate) {
            return new Error('End Date must be after Start Date.')
          }
        }
      }
    },
  }, {
    scopes: {
      guestView: {
        attributes: ['spotId', 'startDate', 'endDate']
      }
    },
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};