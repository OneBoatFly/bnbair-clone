'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName, profileUrl, isSuperhost } = this; // info for that one user instance
      return { id, username, email, firstName, lastName, profileUrl, isSuperhost };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({credential, password}) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, firstName, lastName, password, profileUrl, isSuperhost }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        hashedPassword,
        profileUrl,
        isSuperhost
      });

      // Per documentation, starting with Express 5, route handlers and middleware that return a Promise will 
      // call next(value) automatically when they reject or throw an error.
      // thus, not next(error) used here, but still catch errors on app.js error handler
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true }); // used to seed Spots table

      // User.belongsToMany(models.Spot, {
      //   through: models.Booking,
      //   foreignKey: 'userId',
      //   otherKey: 'spotId',
      // });

      User.belongsToMany(models.Spot, {
        through: models.Review,
        foreignKey: 'userId',
        otherKey: 'spotId',
      });

    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },    
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSuperhost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'updatedAt', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'updatedAt', 'createdAt']}
      },
      loginUser: {
        attributes: {}
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};