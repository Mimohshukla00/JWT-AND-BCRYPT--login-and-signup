const express = require("express");

const router = express.Router();

const { signup } = require("../controller/sigup");
const { login } = require("../controller/login");
const { auth, isStudent, isAdmin } = require("../middleware/auth");
// console.log(auth);

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to protected route",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to student route",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to admin route",
  });
});
module.exports = router;
