'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // used to get review the reviewImage belongs to when deleting the reviewImage
      ReviewImage.belongsTo(models.Review, {foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true});
    }
  }
  ReviewImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },    
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  }, {
    indexes: [{
      fields: ['reviewId', 'url'],
      unique: true,
      validate: true      
    }],
    defaultScope: {
      attributes: ['id', 'url'],
    },
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};