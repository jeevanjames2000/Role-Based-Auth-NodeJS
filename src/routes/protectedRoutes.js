const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const router = express.Router();
const roles = ["Admin", "Moderator", "User"];

router.get("/admin", authenticate, authorize(["Admin"]), (req, res) => {
  res.send("Welcome, Admin!");
});

router.get(
  "/moderator",
  authenticate,
  authorize(["Admin", "Moderator"]),
  (req, res) => {
    res.send("Welcome, Moderator!");
  }
);

router.get("/user", authenticate, authorize(roles), (req, res) => {
  res.send("Welcome, User!");
});

module.exports = router;
