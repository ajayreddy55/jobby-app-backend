const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jobbyUserData = require("../database-models/jobbyusers");
const jwtAuth = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/", (request, response) => {
  response.send({ message: "Authentication Success" });
  console.log("Authentication Success");
});

router.post("/signup", async (request, response) => {
  try {
    const userDetails = request.body;
    const { name, email, phoneNumber, gender, password } = userDetails;

    const isUserExists = await jobbyUserData.findOne({ email: email });

    if (isUserExists === null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new jobbyUserData({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        password: hashedPassword,
      });
      user.save();
      return response.status(200).json({ message: "Registration Success" });
    } else {
      return response.status(400).json({ message: "User Already Exists" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const isUserExists = await jobbyUserData.findOne({ email: email });

    if (isUserExists !== null) {
      const comparePassword = await bcrypt.compare(
        password,
        isUserExists.password
      );
      if (comparePassword) {
        const payload = {
          id: isUserExists._id,
        };

        const jwtToken = jwt.sign(payload, "JOBBY_LOGIN", {
          expiresIn: "24hr",
        });

        return response
          .status(200)
          .json({ token: jwtToken, message: "Successfully Logged in" });
      } else {
        return response
          .status(400)
          .json({ message: "Please Enter Correct Password" });
      }
    } else {
      return response.status(400).json({ message: "Invalid Email" });
    }
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", jwtAuth, async (request, response) => {
  const userInfo = await jobbyUserData.findOne({ _id: request.id });
  response.send(userInfo);
});

module.exports = router;
