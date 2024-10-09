const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//signup route handler

exports.signup = async (req, res) => {
  try {
    // console.log(res);
    // fetching data from  req.body
    const { name, email, password, role } = req.body;
    console.log(email);
    console.log(name);
    // check if email is already exitss or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // hashing password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // create entry
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error signing up" });
  }
};
