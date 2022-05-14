var MongoClient = require('../../server/node_modules/mongodb').MongoClient;
var url = "mongodb://localhost:27017";

const User = require("../../server/models/User");

const jwt = require("jsonwebtoken");

//jasmine spec/jas_login_test.spec.js

describe('init test:', ()=>{
    it('This test should explicitly fail', function() {
        fail("Forced Fail");
    });

    it('This test should explicitly Pass', ()=>{
        expect(1).toBe(1);   
    })
});

//Tests Login
describe('User Login //', ()=>{
    it('Login de un usuario Normal', (done)=>{

        MongoClient.connect(url, function(err, db) { 
            if (err) throw err;

            var dbo = db.db("testMongo");
            var objs = { name: "Test", email:"t@t.com",password: "root", level: "SuperAdmin" };
            
            //Insertar un usuario
            dbo.collection("users").insertOne(objs, function(err, res) {
                if (err) throw err;
                db.close();
            }); 

            //verificar que el usuario exsista
            var querry= dbo.collection("users").findOne({name: "Test"}, function(err, res) {
                if (err) throw err;

                expect(querry.name).toBe("Test");

                db.close();
            }); 
        });
       
        const user = User.findOne({ 
            email: "t@t.com",
            password: "root",
        }) 
        
        //Crear Token
        var token = ""
        if (user) {
            token = jwt.sign({
                name: user.name, 
                email:user.email,
                level:user.level
            }, "KVwL2amj9C")
        } else {
            fail("No user found")
        }
        console.log(user)
        console.log(token)

        //Encontrar al usuario a travez de la token
        if (token){
          const userToken = jwt.decode(token)
          console.log(userToken)
          expect(userToken.name).toBe("Test");
        }else {
            fail("No token");
        }
        
        done()
    })
});