const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true });

app.post("/user-create", async (req, res) => {



  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      level: req.body.level,
    })
    res.json({status:'ok'})
  } catch (err) {
    res.json({status:'error', error: 'Duplicate Email'})
  }
});


app.post("/user-login", async (req, res) => {
  
    const user = await User.findOne({ 
      email: req.body.email,
      password: req.body.password,
    })
  
    if (user) {
      const token = jwt.sign({
          name: user.name, 
          email:user.email,
          level:user.level
      }, "KVwL2amj9C")
        return res.json({status:'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }

});

app.put("/update", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const level = req.body.level;
  const id = req.body.id;
  try {
    await UserModel.findByIdAndUpdate(id, { email, password, level });
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
