const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/sequelize');

const Contact = sequelize.define('Contact', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true
});
// Contact.sync({ alter: true })

module.exports = Contact;