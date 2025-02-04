const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req, res) => {
    console.log("Url: ", req.url);
    return ["/login", "/register"].includes(req.url) ? 5 : 100;
  },
  message: {
    success: false,
    error: "You've sent too many requests",
    res: 400,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: "You've sent too many requests.",
    res: 400,
  },
  headers: true,
});

const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: "You've sent too many requests",
    res: 400,
  },
  headers: true,
});

module.exports = {
  authLimiter,
  generalLimiter,
  strictLimiter,
};
