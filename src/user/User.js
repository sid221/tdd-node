const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modalName: 'user',
  }
);

module.exports = User;
