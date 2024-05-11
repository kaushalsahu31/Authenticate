const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize');
const Contact = require('./contact');
const Spam = require('./spam');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},{
    timestamps: true
});

// User.sync({ alter: true })

module.exports = User;