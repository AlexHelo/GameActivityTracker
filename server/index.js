const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const UserModel = require("./models/User");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

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

app.put("/update", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const password = req.body.password;
  const level = req.body.level;
  const id = req.body.id;

  try {
    await UserModel.findByIdAndUpdate(id, { name, password, level });
  } catch (err) {
    console.log(err);
  }
});

app.get("/admin-query", async (req, res) => {
  UserModel.find({ level: "user" }, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.get("/superadmin-query", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }

    res.send(result);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await UserModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on 3001");
});
