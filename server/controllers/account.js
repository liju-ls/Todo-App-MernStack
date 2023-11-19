const UserModel = require("../models/User");
const asyncMiddleware = require("../middlewares/async");

module.exports.addTodo = asyncMiddleware(async (req, res) => {
  const user = await UserModel.findById(req.id);
  user.todo.push(req.body);
  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "Todo added succesfully." });
});

module.exports.deleteTodo = asyncMiddleware(async (req, res) => {
  const user = await UserModel.findById(req.id);

  user.todo.map((item, index) => {
    if (item.id === req.body.id) {
      user.todo.splice(index, 1);
    }
  });

  await user.save();
  res
    .status(200)
    .json({ status: "success", message: "Todo deleted succesfully." });
});

module.exports.updateTodo = asyncMiddleware(async (req, res) => {
  await UserModel.updateOne(
    { "todo._id": req.body.id },
    { $set: { "todo.$.msg": req.body.updatedMsg } },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ status: "success", message: "Todo updated succesfully." });
});

module.exports.updateCompletedTodo = asyncMiddleware(async (req, res) => {
  await UserModel.updateOne(
    { "todo._id": req.body.id },
    { $set: { "todo.$.completed": req.body.completed } },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json({ status: "success", message: "Todo updated succesfully." });
});

module.exports.fetchAllTodo = asyncMiddleware(async (req, res) => {
  const user = await UserModel.findById(req.id);
  res.status(200).json({ status: "success", todo: user.todo });
});
