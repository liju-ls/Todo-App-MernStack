const express = require("express");
const router = express.Router();
const {
  addTodo,
  fetchAllTodo,
  deleteTodo,
  updateTodo,
  updateCompletedTodo,
} = require("../controllers/account");
const { isAuth } = require("../middlewares/authorization");

router.get("/", (req, res) => {
  res.json({ page: "Homepage" });
});

router.patch("/new", isAuth, addTodo);

router.patch("/update", isAuth, updateTodo);

router.post("/delete", isAuth, deleteTodo);

router.get("/allTodo", isAuth, fetchAllTodo);

router.patch("/toggleTodo", isAuth, updateCompletedTodo);

module.exports = router;
