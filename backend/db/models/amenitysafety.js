'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AmenitySafety extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AmenitySafety.init({
    smokeAlarm: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    firstAid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    fireExtinguisher: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bedroomDoorLock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    co2Alarm: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'AmenitySafety',
  });
  return AmenitySafety;
};