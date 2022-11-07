const express = require("express");
const todosRouter = express.Router();
const { todosModel } = require("../Models/Todos.model");
const { authentication } = require("../Middlewares/auth");
const { userModel } = require("../Models/User.model");

todosRouter.get("/todos", authentication, async (req, res) => {
  const { user_id } = req.body;
  const user = await todosModel.find({ user_id });
  res.send({ user });
});

todosRouter.post("/create", authentication, async (req, res) => {
  const new_data = new todosModel({
    ...req.body,
  });
  await new_data.save();
  res.send({ msg: "Task Created Successfull" });
});

todosRouter.delete("/delete/:id", authentication, async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;
  const user = await todosModel.find({ user_id, id });
  res.send({ msg: "Data deleted successfull" });
});

todosRouter.patch("/patch/:id", authentication, async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;
  const { taskname, tag } = req.body;
  const user = await todosModel.find(
    { user_id, _id: id },
    { $set: { taskname, tag } }
  );
  res.send({ msg: "Data deleted successfull" });
});

module.exports = {
  todosRouter,
};
