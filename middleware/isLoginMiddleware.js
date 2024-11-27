const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");
const token = require

module.exports =  async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error", "YOU NEED TO LOGIN FIRST");
        return res.redirect("/");
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email: decoded.email}).select("-password");

        req.user = user;
        next();
    }catch(err){
        req.flash("error", "something went wrong");
        res.redirect("/js");
        console.log(err);
    };
};