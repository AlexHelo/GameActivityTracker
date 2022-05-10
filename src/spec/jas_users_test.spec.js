var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const User = require('../models/User')

//jasmine spec/jas_users_test.spec.js

describe('Test tests', ()=>{
    it('Should explicitly fail', function() {
        fail("Forced Fail");
    });

    it('Should explicitly Pass', ()=>{
        expect(1).toBe(1);   
    })
});

//Tests Usuarios
describe('User.createInstance & Delete //', ()=>{
    it('Crea una instancia de un Usuario & Borrarla', (done)=>{

        MongoClient.connect(url, function(err, db) {
            
            if (err) throw err;

            var dbo = db.db("testMongo");
            var objs = [{ name: "Test", password: "root", level: "SuperAdmin" }];
            
            //Crear Db
            dbo.collection("users").insertMany(objs, function(err, res) {
                if (err) throw err;
                //console.log(objs.length+" document inserted");
                
                expect(objs.length).toBe(1);

                db.close();
            });

            //Borrar Db
            var myquery = { name: "Test" };

            dbo.collection("Users").deleteOne(myquery, function(err, obj) {
                if (err) throw err;

                //console.log("1 user deleted");

                db.close();

            });

            done()

        });
    })
});

//Tests Login
describe('Login & LogOut //', ()=>{
    it('Iniciar sesión y cerrar sesión', (done)=>{

        expect(1).toBe(1);
        done()

    })
});