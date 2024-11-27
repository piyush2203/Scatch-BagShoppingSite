const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken=(user)=>{
    // console.log(process.env.JWT_KEY);
    return  jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
}

module.exports.generateToken = generateToken;