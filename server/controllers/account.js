const UserModel = require("../models/User");

module.exports.addTodo = async (req, res) => {
  await UserModel.findById(req.id)
    .then(async (user) => {
      user.todo.push(req.body);
      await user.save().then(() => {
        res.send("saved todo.");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.deleteTodo = async (req, res) => {
  await UserModel.findById(req.id)
    .then(async (user) => {
      user.todo.map((item, index) => {
        if (item.id === req.body.id) {
          user.todo.splice(index, 1);
          user.save();
          res.end();
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updateTodo = async (req, res) => {
  await UserModel.updateOne(
    { "todo._id": req.body.id },
    { $set: { "todo.$.msg": req.body.updatedMsg } },
    {
      new: true,
    }
  )
    .then(() => {
      res.json({ status: "Updated." });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.fetchAllTodo = async (req, res) => {
  await UserModel.findById(req.id)
    .then((user) => {
      res.json(user.todo);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.updateCompletedTodo = async (req, res) => {
  console.log(req.body.completed);
  await UserModel.updateOne(
    { "todo._id": req.body.id },
    { $set: { "todo.$.completed": req.body.completed } },
    {
      new: true,
    }
  )
    .then(() => {
      res.json({ status: "Updated." });
    })
    .catch((err) => {
      console.log(err);
    });
};
