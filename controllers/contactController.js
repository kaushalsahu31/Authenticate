const { HandleRes, validater } = require("../common/helper");
const User = require('../models/user');
const Contact = require('../models/contact');
const Spam = require("../models/spam");
const { Op, Sequelize } = require("sequelize");

module.exports.addContact = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const { userId } = req.user;

        validater(res, ['name', 'phoneNumber'], req.body);

        const user = await User.findByPk(userId);
        if (!user) {
            return HandleRes(res, 404, 'User not found');
        }

        const contact = await Contact.create({ name, phoneNumber, userId });
        return HandleRes(res, 200, 'Contact added successfully', contact);
    } catch (error) {
        return HandleRes(res, 500, 'Failed to add contact');
    }
};

module.exports.getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const contacts = await Contact.findAndCountAll({
            where: { userId: req.user.userId },
            limit: parseInt(limit),
            offset:parseInt(offset),
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        const promises = contacts.rows.map(async (contact) => {
            const spam = await Spam.count({
                where: { phoneNumber: contact.phoneNumber, userId: req.user.userId }
            });
            return { ...contact.toJSON(), spam: spam };
        });

        const data = await Promise.all(promises);
        const totalPages = Math.ceil(contacts.count / limit);

        return HandleRes(res, 200, 'Contacts fetched successfully', {
            totalResults: contacts.count,
            totalPages,
            currentPage: page,
            data: data
        });
    } catch (error) {
        return HandleRes(res, 500, 'Failed to fetch contacts', error.message);
    }
};
