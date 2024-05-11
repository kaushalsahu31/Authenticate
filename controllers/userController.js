const bcrypt = require('bcrypt');
const User = require('../models/user');
const { HandleRes, validater } = require('../common/helper');
const { generateToken } = require('../config/jwt');

module.exports.register = async (req, res) => {
  try {
    const { name, phoneNumber, email, password,image } = req.body;

    validater(res,["name", "phoneNumber", "password"],req.body)
    const Existuser = await User.findOne({ where: { phoneNumber } });

    if (Existuser) return HandleRes(res, 404, 'User Already exist');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      image
    });
    const token = generateToken(user.id);
    return HandleRes(res, 200, "User created successfully", { user, token });
  } catch (error) {
    return HandleRes(res, 500, error.message);
  }
},

  module.exports.login = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;

      validater(res,["phoneNumber", "password"],req.body)

      const user = await User.findOne({ where: { phoneNumber } });

      if (!user) return HandleRes(res, 404, 'User not found');

      const match = await bcrypt.compare(password, user.password);
      if (!match) return HandleRes(res, 401, 'Incorrect password');

      const token = generateToken(user.id);

      return HandleRes(res, 200, "User login successfully", { user, token });

    } catch (error) {
      return HandleRes(res, 500, error.message);
    }
}
module.exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    await User.destroy({ where: { id: userId } });
    return HandleRes(res, 200, 'Account deleted successfully');
  } catch (error) {
    return HandleRes(res, 500, error.message);
  }
};

module.exports.updateAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    const {  phoneNumber,  password, ...body  } = req.body;
    if (password){
      body.password = await bcrypt.hash(password, 10);
    }
    await User.update(body, { where: { id: userId } });
    const user = await User.findOne({ where: { id: userId } })
    return HandleRes(res, 200, 'Account updated successfully',user);
  } catch (error) {
    return HandleRes(res, 500, error.message);
  }
};
