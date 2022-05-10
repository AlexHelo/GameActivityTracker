const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const SpotifyStrategy = require('passport-spotify').Strategy;
const findOrCreate = require("mongoose-findorcreate");
var passport = require('passport')
  , util = require('util')
  , session = require('express-session')
  //, SteamStrategy = require('./lib/passport-steam/index').Strategy
  , SteamStrategy = require('passport-steam').Strategy
  , authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'Gamer',
  name: 'GameChord',
  resave: true,
  saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/spotify', passport.authenticate('spotify'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3001/auth/steam/return',
  realm: 'http://localhost:3001/',
  apiKey: '3187604900E3A919C6CCB848D996D1AB',
},
function(identifier, profile, done) {
  process.nextTick(function () {
    console.log(identifier)
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  }
);


passport.use(
  new SpotifyStrategy(
    {
      clientID: "3d133132c4ca4a499febaa0a907c23d2",
      clientSecret: "25249af674c641dca0a2361c8f483abc",
      callbackURL: 'http://localhost:3001/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.create({ email: profile.id, 
                    password: "test",
                    level: "user" }, 
        function(err, user) {
        return done(err, user);
      });
    }
  )
);

app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.listen(3002);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

app.get('/', function(req, res) {
  if (req.user)
      res.send('Stored in session when logged : <br><br> ' + 
          JSON.stringify(req.user) + '<br><br>' +
          '<a href="/logout">Logout</a>'+ '<br><br>' +
          '<a href="/gamer">CheckCheck</a>');
  else
      res.send('Not connected : <a href="/auth/steam"><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png"></a>');
});
app.get('/gamer', ensureAuthenticated, function(req, res) {
  if (req.user)
      res.send('Check : <br><br> ' + 
          JSON.stringify(req.user.displayName) + '<br><br>' +
          '<a href="/logout">Logout</a>'+ '<br><br>' +
          '<a href="/">Back</a>');
  else
      res.send('Not connected : <a href="/auth/steam"><img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png"></a>');
});


//Mongoose Connection
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
