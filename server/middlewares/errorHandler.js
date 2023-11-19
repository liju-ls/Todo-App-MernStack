const winston = require("winston");
const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.info(err.message, err);
  res.status(500).json({ status: "failed", message: err.message });
};
