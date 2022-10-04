const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "You must provide a name"],
    trim: "true",
  },
  last_name: {
    type: String,
    required: [true, "You must provide a name"],
    trim: "true",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "You must provide an email"],
    trim: "true",
  },
  password: {
    type: String,
    required: [true, "You must provide an password"],
  },
});

module.exports = mongoose.model("User", UserSchema);
