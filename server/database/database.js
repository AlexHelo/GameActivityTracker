var mongo = require('mongodb'); 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";

exports.CreateUser = function(user){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var myobj = { name: user.name, password: user.password, level: user.level }
    dbo.collection("Users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 user inserted");
      db.close();
    });
  }); 
}
exports.DeleteUser = function(id){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var myquery = { id: id };
    dbo.collection("Users").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 user deleted");
      db.close();
    });
  }); 
}
exports.UpdateUser = function(user,id){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    var myquery = { id: id };
    var newvalues = { $set: {name: user.name, password: user.password, level: user.level } };
    dbo.collection("Users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 user updated");
      db.close();
    });
  }); 
}
exports.AllUsers = function(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("testMongo");
    dbo.collection("Users").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return(result);
    });
  }); 
}
