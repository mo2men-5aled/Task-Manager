const User = require("../models/User");

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ msg: "email must be unique" });
    } else {
      res.json({ msg: error.message });
    }
  }
};

module.exports = createUser;
