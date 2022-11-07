const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  taskname: { type: String, require: true },
  status: { type: String, default: "pending" },
  tag: { type: String, require: true },
  user_id: { type: String, require: true },
});

const todosModel = mongoose.model("todo", todosSchema);

module.exports = {
  todosModel,
};
