const express = require("express");
const router = express.Router();
const { postLogin, postRegister } = require("../controllers/auth");

router.post("/login", postLogin);

router.post("/register", postRegister);

module.exports = router;
