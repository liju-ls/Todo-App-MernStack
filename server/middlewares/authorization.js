const jwt = require("jsonwebtoken");
const asyncMiddleware = require("./async");
const winston = require("winston");
const logger = require("../utils/logger");

module.exports = async (req, res, next) => {
  if (!req.headers["x-auth-token"]) {
    logger.error("Invalid token");
    return res.status(400).json({ status: "failed", message: "Token error." });
  }

  jwt.verify(
    req.headers["x-auth-token"],
    process.env.JWT_KEY,
    (err, decode) => {
      if (err) {
        logger.error("Token error", err);
        return res
          .status(400)
          .json({ status: "failed", message: "Token error." });
      }
      req.id = decode._doc._id;
      next();
    }
  );
};
