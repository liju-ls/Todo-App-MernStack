const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const errorController = require("./controllers/error");
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");

app.use(
  cors({
    origin: "https://todoappclient-vgnm.onrender.com/",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", accountRoute);
app.use("/auth", authRoute);
app.use(errorController.notFound);

app.listen(process.env.PORT, () =>
  console.log(`Server running at ${process.env.PORT}.`)
);
