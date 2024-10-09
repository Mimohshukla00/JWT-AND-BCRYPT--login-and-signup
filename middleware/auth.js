const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    //JWT TOKEN
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401).json({ message: "You are not a student" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "user route cannot matches" });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({ message: "You are not a admin" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "user route cannot matches" });
  }
};
