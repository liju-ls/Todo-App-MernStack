const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

module.exports.postLogin = async (req, res) => {
  await UserModel.findOne({ email: req.body.email })
    .then((data) => {
      if (!data) {
        return res.send("Invalid email.");
      }

      bcrypt.hash(req.body.password, 8).then((hashed) => {
        if (!hashed === data.password) {
          return res.send("Invalid Password.");
        }
        const token = jwt.sign({ ...data }, process.env.JWT_KEY);
        res.set("x-auth-token", token);
        res.set("Access-Control-Expose-Headers", "x-auth-token");
        return res.status(200).end();
      });
    })
    .catch((err) => {
      return console.log(err);
    });
};

module.exports.postRegister = async (req, res) => {
  console.log(req.body);
  await UserModel.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        return res.send("Email already exist.");
      }
      bcrypt.hash(req.body.password, 8).then((hashed) => {
        const user = new UserModel({ ...req.body, password: hashed });
        user.save();
        return res.send("Account created.");
      });
    })
    .catch((err) => {
      return res.send("Something went wrong.");
    });
};
