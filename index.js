const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
var cors = require("cors");
app.use(cors());
const { connection } = require("./Config/db");
const { todosRouter } = require("./Routes/Todos.route");
const { userRouter } = require("./Routes/User.route");

app.get("/", (req, res) => {
  res.send({ msg: "Main home Page" });
});

app.use("/", userRouter);
app.use("/", todosRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("DB connected successfull");
  } catch (err) {
    console.log("Error on DB connecting");
    console.log(err);
  }

  console.log(`App Listening On Port ${process.env.PORT}`);
});
