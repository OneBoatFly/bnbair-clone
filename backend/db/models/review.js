'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' }); // used to include users for /api/spots/:spotId/reviews
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' }); // used to include spots for /api/reviews/current

      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true}); 
      // used to add images to review, and include ReviewImage when getting reviews
    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
  }, {
    indexes: [{
      fields: ['spotId', 'userId'],
      unique: true,
      validate: true,      
    }],
    sequelize,
    modelName: 'Review',
  });
  return Review;
};