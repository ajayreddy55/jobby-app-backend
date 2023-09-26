const mongoose = require("mongoose");

const usersDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const jobbyUserData = mongoose.model("jobbyUSerData", usersDataSchema);

module.exports = jobbyUserData;
