var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/test";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var objs = [
    { email: "super@gmail.com", password: "root", level: "superadmin" },
    { email: "admin@gmail.com", password: "root", level: "admin" },
    { email: "user@gmail.com", password: "root", SteamID:"Steam", SpotifyID: "Spotify", level: "user" },
  ];
  dbo.collection("user-data").insertMany(objs, function (err, res) {
    if (err) throw err;
    console.log(objs.length + " document inserted");
    db.close();
  });
});