'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' }); // used to get include Owner for /api/spots/:spotId
      
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }); // used to delete SpotImages when spot is deleted
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: "CASCADE", hooks: true}); // used to create booking for spot
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: "CASCADE", hooks: true }); // used to create review for spot

      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'spotId',
        otherKey: 'userId',
      });

      Spot.belongsToMany(models.User, {
        through: models.Review,
        foreignKey: 'spotId',
        otherKey: 'userId',
      });

      Spot.hasOne(models.AmenityBasic, { foreignKey: 'id' })
      Spot.hasOne(models.AmenityStandout, { foreignKey: 'id' })
      Spot.hasOne(models.AmenitySafety, { foreignKey: 'id' })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -90.0,
        max: 90.0
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -180.0,
        max: 180.0
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0
      }
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      validate: {
        isInt: true,
        min: 1,
        max: 16
      }
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: true,
        min: 0,
        max: 50
      }  
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: true,
        min: 1,
        max: 50
      }
    },
    bathrooms: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isDecimal: true,
        min: 0.5,
        max: 50
      }
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },  
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};

// indexes: [{
//   fields: ['address', 'city', 'state', 'country'],
//   unique: true,
//   validate: true,
// }],