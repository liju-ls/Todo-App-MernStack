const winston = require("winston");

module.exports = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: "logfile.log",
      format: winston.format.json(),
    }),
  ],
});
