const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
let defaultRol = process.env.DEFAULT_ROL;

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary');

router.get("/", ensureLoggedOut(), (req, res, next) => {
  res.redirect("login");
});



const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

router.post('/login', ensureLoggedOut(), (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {

    // Check for errors
    if (err) next(res.status(500).json({error:"Something went wrong"}));
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", ensureLoggedOut(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const rol = defaultRol;
  if (username === "" || password === "") {
    next(res.status(500).json({error:"Indicate username and password"}));
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      next(res.status(500).json({error:"The username already exists"}));
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      rol: rol
    });

    newUser.save()
        .then((userCreated) => {
          res.json(userCreated);
        })
        .catch(err => {
          next(res.status(500).json({error:"Something went wrong"}));
        })
  });
});

router.get('/loggedin', (req,res,next) => {
  if(req.user){
    //console.log(req.user)

    res.status(200).json(req.user);
  }else{
    next(res.status(500).json({error:"Nobody loggedin"}))
  }
})

router.get("/logout", ensureLoggedIn('/login'), (req, res) => {
  console.log("In loggedout");
  req.logout();
  res.status(200).json({message:"Nobody loggedin"})
});


router.post("/edit", ensureLoggedIn('/login'), (req, res, next) => {
  const username = req.body.username;
  const campus = req.body.campus;
  const course = req.body.course;


  User.findOneAndUpdate(
      { "username" : username },
      {$set:{campus: campus , course:course}} ,
      {new:true})
      .then(userUpdated=>{
        if (userUpdated === null) {
          next(res.status(500).json({error:"User not found"}));
          return;
        }
        res.status(200).json({userUpdated})})
      .catch(err => {
        next(res.status(500).json({error:"Something went wrong"}));
      }).catch(err=>{next(res.status(500).json({error:"User not found"}))})

});


router.post("/uploadpic", uploadCloud.single('image') ,(req, res, next) =>{
  if(req.user){
    User.findOneAndUpdate(
        { "username" : req.user.username },
        {$set:{image_url: req.file.url }} ,
        {new:true})
        .then(userUpdated=>{
          if (userUpdated === null) {
            next(res.status(500).json({error:"User not found"}));
            return;
          }
          res.status(200).json({userUpdated})})
        .catch(err => {
          next(res.status(500).json({error:"Something went wrong"}));
        }).catch(err=>{next(res.status(500).json({error:"User not found"}))})
  }else{
    next(new Error('Not logged in'))
  }
})



router.put("/strainFavAdd/:idStrain", (req, res, next)=>{
  let idStrain = req.params.idStrain;
  let idUser = req.user._id;
  //console.log("strainFavAdd ", idUser, idStrain);
  User.findByIdAndUpdate(idUser,
    {$addToSet: { strains: idStrain }},{ new: true })
    .then((userUpdated) => {
      console.log(userUpdated)
      return res.json(userUpdated)})

})

router.put("/strainFavRemove/:idStrain", (req, res, next)=>{
  let idStrain = req.params.idStrain;
  let idUser = req.user._id;
  //console.log("strainFavRemove ", idUser, idStrain);
  User.findByIdAndUpdate(idUser,
    {$pull: { strains: idStrain }},{ new: true })
    .then((userUpdated) => {
      console.log(userUpdated)
      return res.json(userUpdated)})
})

module.exports = router;
