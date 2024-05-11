const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize');

const Spam = sequelize.define('Spam', {
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true
});
// Spam.sync({ alter: true })

module.exports = Spam;