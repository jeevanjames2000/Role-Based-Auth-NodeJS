const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const KEY = "SOME_SECRET_KEY_RBAC";

const Roles = {
  Admin: ["Admin", "Moderator", "User"],
  Moderator: ["Moderator", "User"],
  User: ["User"],
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorize = (requiredRoles) => (req, res, next) => {
  const userRoles = Roles[req.user.role] || [];
  if (!requiredRoles.some((role) => userRoles.includes(role))) {
    return res.status(403).json({ message: "Access forbidden" });
  }
  next();
};

module.exports = { authenticate, authorize };
