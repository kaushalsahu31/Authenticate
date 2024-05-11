const { Op } = require('sequelize');
const { HandleRes } = require('../common/helper');
const Contact = require('../models/contact'); 
const User = require('../models/user'); 
const Spam = require('../models/spam');

module.exports.searchContacts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return HandleRes(res, 400, 'Search query is required');
    }

    const offset = (page - 1) * limit;

    const contacts = await Contact.findAndCountAll({
        where: {
            [Op.or]: [
              { name: { [Op.like]: `%${query}%` } },
              { phoneNumber: { [Op.like]: `%${query}%` } },
            ],
        },
        limit: parseInt(limit),
        offset:parseInt(offset),
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const promises = contacts.rows.map(async (contact) => {
        const spam = await Spam.count({
            where: { phoneNumber: contact.phoneNumber }
        });
        return { ...contact.toJSON(), spam: spam };
    });

    const data = await Promise.all(promises);


    
    const totalPages = Math.ceil(contacts.count / limit);

    return HandleRes(res, 200, 'Search results', {
      totalResults: contacts.count,
      totalPages,
      currentPage: page,
      data: data
    });
  } catch (error) {
    return HandleRes(res, 500, error.message);
  }
};
