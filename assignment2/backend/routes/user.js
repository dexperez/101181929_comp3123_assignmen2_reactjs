const express = require("express");
const UserModel = require("../model/User");
const routes = express.Router();
const cors = require('cors');

routes.use(cors());

// Create new account
// http://localhost:8080/api/v1/user/signup
routes.post("/signup", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
// http://localhost:8080/api/v1/user/login
routes.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Use req.body to get data

    if (!username || !password) {
      res.status(401).json({
        status: false,
        message: "Username and password are required",
      });
      return;
    }

    const user = await UserModel.findOne({ username });

    if (user && username === user.username && password === user.password) {
      res.status(200).json({
        status: true,
        username,
        password,
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Invalid username and password",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = routes;
