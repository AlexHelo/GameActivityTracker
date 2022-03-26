const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const UserModel = require("./models/User");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

app.get("/", async (req, res) => {
  const user = new UserModel({
    name: "Usuario",
    password: "123",
    level: "user",
  });

  try {
    await user.save();
    res.send("inserted");
  } catch (err) {
    console.log(err);
  }
});

app.post("/user-create", async (req, res) => {
  const user = new UserModel({
    name: req.body.name,
    password: req.body.password,
    level: req.body.level,
  });

  try {
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});
