const jwt = require("jsonwebtoken");

module.exports.isAuth = async (req, res, next) => {
  if (!req.headers["x-auth-token"]) {
    return res.status(401).json({ msg: "Something went wrong 1." });
  }

  const isValid = jwt.verify(req.headers["x-auth-token"], process.env.JWT_KEY);

  if (!isValid) {
    return res.status(401).json({ msg: "Something went wrong 2." });
  }

  const decodedToken = jwt.decode(req.headers["x-auth-token"]);
  req.id = decodedToken._doc._id;
  next();
};
