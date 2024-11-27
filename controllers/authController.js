// const bcrypt = require("bcryptjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");
const userModel = require("../models/usermodel");

module.exports.registerUser = async function (req, res) {
    try {
      let { email, fullname, password } = req.body;
        
        let user = await userModel.findOne({email:email});
        if(user) return res.status(401).send("You are already have an account, please login.");

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return res.send(err.message);
          } else {
            let user = await userModel.create({
              email,
              password: hash,
              fullname,
            });
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
          }
        });
      });
    } catch (error) {
      res.send(error.message);
    }
};








module.exports.loginUser = async function(req,res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.render("incorrect");

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            res.redirect("/");
            // res.flash("error", "Email or Password is incorect")
        }
    });
};


module.exports.logout = async function(req,res){
  res.cookie("token", "");
  res.redirect("/")
}
