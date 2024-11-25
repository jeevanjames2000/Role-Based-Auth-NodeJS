const User = require("../models/models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const KEY = "SOME_SECRET_KEY_RBAC";

const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error.message: ", error);
  }
};
const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token is required" });
  // i dont know the exact requirements for logout
  // whether we need to remove the token from DB (or) make the Token validity null? (or)
  // storing in cache for future login untill token expires
  // as of know making the token null when logout
  try {
    const decoded = jwt.verify(token, KEY);
    const user = await User.findById(decoded.id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    user.token = null;
    await user.save();

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please log in again." });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { register, login, logout };
