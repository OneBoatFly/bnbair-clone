'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AmenityBasic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   AmenityBasic.belongsTo(models.Spot, { foreignKey: 'id'})
    }
  }
  AmenityBasic.init({
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tv: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    kitchen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    washer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    freeParking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    paidParking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    airConditioning: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dedicatedWorkspace: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'AmenityBasic',
  });
  return AmenityBasic;
};