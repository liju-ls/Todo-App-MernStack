const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    msg: { type: String, required: true },
    completed: { type: Boolean },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 3, maxLength: 10, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todo: [todoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
