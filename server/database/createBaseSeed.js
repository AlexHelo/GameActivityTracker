var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("testMongo");
  var objs = [{ name: "Pepex", password: "root", level: "SuperAdmin" },
              { name: "Nacho", password: "root", level: "SuperAdmin" },
              { name: "PepexAdm", password: "root", level: "Admin" },
              { name: "PepexUser", password: "root", level: "User" }
            ];
  dbo.collection("users").insertMany(objs, function(err, res) {
    if (err) throw err;
    console.log(objs.length+" document inserted");
    db.close();
  });
}); 