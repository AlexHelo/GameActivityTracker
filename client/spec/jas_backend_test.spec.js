var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

const jwt = require("jsonwebtoken");

//jasmine spec/jas_backend_test.spec.js

describe('init test:', ()=>{
    it('This test should explicitly fail', function() {
        fail("Forced Fail");
    });

    it('This test should explicitly Pass', ()=>{
        expect(1).toBe(1);   
    })
});


//Tests crear
describe('User.createInstance //', ()=>{
    it('Crea una instancia de un Usuario', (done)=>{
        MongoClient.connect(url, function(err, db) {
            
            if (err) throw err;

            var dbo = db.db("testMongo");
            var objs = [{ name: "Test", password: "root", level: "SuperAdmin" }];
            
            //Crear Db
            dbo.collection("users").insertMany(objs, function(err, res) {
                if (err) throw err;
                db.close();
            }); 

            var querry= dbo.collection("users").findOne({name: "Test"}, function(err, res) {
                if (err) throw err;

                expect(querry.name).toBe("Test");

                db.close();
            }); 

            done()

        });
    })
});

//Tests Borrar
describe('User.delete //', ()=>{
    it('Crea borra una instancia de usuario de la Bd', (done)=>{
        MongoClient.connect(url, function(err, db) {
            
            if (err) throw err;

            var dbo = db.db("testMongo");
            var objs = [{ name: "Test", password: "root", level: "SuperAdmin" }];
            
            //Borrar Db
            var myquery = { name: "Test" };
            dbo.collection("users").deleteOne(myquery, function(err, obj) {
                if (err) throw err;
                //console.log("1 user deleted");
                db.close();
            });

            //Comprobar que se borró
            var querry= dbo.collection("users").findOne({name: "Test"}, function(err, res) {
                if (err) throw err;

                expect(querry.name).toBe(undefined);
                
                db.close();
            });
 

            done()
        });
    })
});