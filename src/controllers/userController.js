const Database = require('../database/database')

exports.User_List = function(req, res){
    Database.AllUsers()
        .then((data)=>{
            return data;
        })
}
//Create
exports.Admin_create_normal_User = function(req, res){
    let user = {
        name: req.body.name,
        password: req.body.password,
        level: "User",
      };
    Database.CreateUser(user)
      .then(()=>{
        res.redirect('/')
      })
} 
exports.SuperAdmin_create_Admin_User = function(req, res){
    let user = {
        name: req.body.name,
        password: req.body.password,
        level: "Admin",
      };
    Database.CreateUser(user)
      .then(()=>{
        res.redirect('/')
      })
}
exports.User_create_normal_User = function(req, res){
    let user = {
        name: req.body.name,
        password: req.body.password,
        level: "User",
      };
    Database.CreateUser(user)
      .then(()=>{
        res.redirect('/')
      })
} 
//Delete
exports.User_delete_normal_User = function(req, res){
    let id = req.params.id;
    Database.DeleteUser(id)
      .then(() => {
        res.redirect('/')
      });
} 
exports.Admin_delete_normal_User = function(req, res){
    let id = req.params.id;
    Database.DeleteUser(id)
      .then(() => {
        res.redirect('/')
      });
} 
exports.SuperAdmin_delete_Admin_User = function(req, res){
    let id = req.params.id;
    Database.DeleteUser(id)
      .then(() => {
        res.redirect('/')
      });
} 
//Update
exports.Admin_update_normal_User = function(req,res){
    let id = req.params.id;
    let userUpdate = {
            name: req.body.name,
            password: req.body.password,
            level: req.body.level,
        };
    Database.UpdateUser(userUpdate,id)
        .then(() => {
            res.redirect('/')
        });
}

exports.User_update_normal_User = function(req,res){
    let id = req.params.id;
    let userUpdate = {
            name: req.body.name,
            password: req.body.password,
            level: req.body.level,
        };
    Database.UpdateUser(userUpdate,id)
        .then(() => {
            res.redirect('/')
        });
}

exports.SuperAdmin_update_normal_User = function(req,res){
    let id = req.params.id;
    let userUpdate = {
            name: req.body.name,
            password: req.body.password,
            level: req.body.level,
        };
    Database.UpdateUser(userUpdate,id)
        .then(() => {
            res.redirect('/')
        });
}
