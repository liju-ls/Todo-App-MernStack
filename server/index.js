const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const winston = require("winston");
require("dotenv").config();

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to mongodb."))
  .catch((err) => console.log(err));

const app = express();
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");
const errorHandler = require("./middlewares/errorHandler");

app.use(
  cors({
    origin: "https://todoappclient-vgnm.onrender.com",
    methods: "GET, POST, PATCH, DELETE",
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", accountRoute);
app.use("/auth", authRoute);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}.`)
);
