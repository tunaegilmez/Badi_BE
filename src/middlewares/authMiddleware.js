const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(req.headers);

  if (!authHeader) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ error: "Invalid Authorization format" });
  }

  const token = tokenParts[1];

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
