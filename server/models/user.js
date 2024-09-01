const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "fullname is required"],
    maxlength: [20, "name can not be more than 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  phonenumber: {
    type: String,
    required: [true, "PhoneNumber is required"],
    minlength: [10, "incorrect phone number"],
    trim: true,
  },

  message: {
    type: String,
    required: [true, "message is required"],
    trim: true,
  },
});
module.exports = mongoose.model("contact-us", schema);
