const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:127017/scatch");

const userSchema =  mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
],
    
    orders : {
        type: Array,
        default:[]
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model("user", userSchema);