const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const asyncMiddleware = require("../middlewares/async");

module.exports.postLogin = asyncMiddleware(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    throw new Error("Invalid email.");
  }

  const isValidPass = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPass) throw new Error("Invalid password.");

  jwt.sign({ ...user }, process.env.JWT_KEY, (err, token) => {
    if (err) throw new Error(err);

    res.set("x-auth-token", token);
    res.set("Access-Control-Expose-Headers", "x-auth-token");

    return res
      .status(200)
      .json({ status: "sucess", message: "login success." });
  });
});

module.exports.postRegister = asyncMiddleware(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (user) {
    throw new Error("Email already exist.");
  }

  const hashed = await bcrypt.hash(req.body.password, 8);
  const newUser = new UserModel({ ...req.body, password: hashed });
  await newUser.save();
  res
    .status(200)
    .json({ status: "success", message: "Account created succesfully." });
});
