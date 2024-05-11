const { validater, HandleRes } = require('../common/helper');
const Spam  = require('../models/spam');

module.exports.removeFromSpam = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const { userId } = req.user;
  
      validater(res, ['phoneNumber'], req.body);
  
      const existingReport = await Spam.findOne({
        where: { phoneNumber, userId },
      });
  
      if (!existingReport) {
        return HandleRes(res, 404, 'Number not found in spam list');
      }
  
      await existingReport.destroy();
      return HandleRes(res, 200, 'Number removed from spam list');
    } catch (error) {
      return HandleRes(res, 500, 'Failed to remove number from spam list');
    }
  };

  module.exports.addToSpam = async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const { userId } = req.user;
  
      validater(res, ['phoneNumber'], req.body);
  
      const existingReport = await Spam.findOne({
        where: { phoneNumber, userId },
      });
  
      if (existingReport) {
        return HandleRes(res, 400, 'Number already reported as spam');
      }
  
      const report = await Spam.create({ phoneNumber, userId });
      return HandleRes(res, 200, 'Number added to spam list', report);
    } catch (error) {
      return HandleRes(res, 500, 'Failed to add number to spam list');
    }
  };