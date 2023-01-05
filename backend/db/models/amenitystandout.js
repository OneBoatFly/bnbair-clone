'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AmenityStandout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AmenityStandout.init({
    pool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hotTub: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    patio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    bbqGrill: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    outdoorDining: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    Firepit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    poolTable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    indoorFireplace: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    piano: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    exerciseEquipment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    lakeAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    beachAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    skiInOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    outdoorShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'AmenityStandout',
  });
  return AmenityStandout;
};