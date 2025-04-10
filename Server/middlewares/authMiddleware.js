// auth.js
const jwt = require("jsonwebtoken");

const auth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: Insufficient role" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Access denied: Invalid token" });
    }
  };
};

module.exports = auth;
