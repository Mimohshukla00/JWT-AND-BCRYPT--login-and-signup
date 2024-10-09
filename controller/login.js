const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    //   console.log(user);

      user = user.toObject();
      user.token = token;

    //   console.log(user);
      user.password = undefined;
    //   console.log(user);
      const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        user: user,
        message: "user logged in successfully",
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "login error", success: false });
  }
};
