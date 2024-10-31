const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

class AuthService {
  generateToken(user) {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: "24h" });
  }

  verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token)
      return res.status(403).json({ error: "Authorization required" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = decoded;
      next();
    });
  }
}

module.exports = new AuthService();
