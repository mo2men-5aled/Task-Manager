const User = require("../models/User");

const isUpperCase = (string) => /^[A-Z]*$/.test(string);
function containsCapital(str) {
  var res = 0;
  for (let i = 0; i < str.length; i++)
    if (isUpperCase(str[i])) {
      res++;
    }
  return res;
}

const createUser = async (req, res) => {
  try {
    var errorlist = [];
    //validate password against special chars
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(req.body.password)) {
      errorlist.push("must contain a special character");
    }
    if (req.body.password.length < 8) {
      errorlist.push("must contain at least 8 letters");
    }
    if (!containsCapital(req.body.password)) {
      errorlist.push("must contain capital letter");
    }
    //validate first name
    if (!req.body.first_name.length) {
      errorlist.push("Please insert first name");
    }

    //validate last name
    if (!req.body.last_name.length) {
      errorlist.push("Please insert last name");
    }

    //validate email
    if (!req.body.email.length) {
      errorlist.push("Please insert email");
    }

    //validate email is unique
    if (await (await User.find({ email: req.body.email })).length) {
      errorlist.push("email is registered");
    }

    if (errorlist.length) res.json({ msg: errorlist });
    else {
      const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });

      res.status(201).json({ userId: user._id });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const findUser = async (req, res) => {
  var errorlist = [];

  //validate email not empty
  if (!req.body.email.length) {
    errorlist.push("Please insert email");
  }

  //validate password not empty
  if (!req.body.password.length) {
    errorlist.push("Please insert password");
  }

  //validate wrong username
  if (!(await await User.find({ email: req.body.email }))) {
    errorlist.push("user not signed up or wrong email please try again");
  }

  if (
    (await await User.find({ email: req.body.email })) &&
    !(await await User.find({ password: req.body.password })).length
  ) {
    errorlist.push("Wrong Password");
  }

  if (errorlist.length) res.json({ msg: errorlist });
  else {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ userId: user[0]._id });
  }
};
module.exports = { createUser, findUser };
