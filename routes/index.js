const express = require("express");
const router = express.Router();
const isLogin = require("../middleware/isLoginMiddleware");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");

                       
router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isLogin, async function(req,res){
    let products = await productmodel.find();
    let success = req.flash("success" ); //this success value is coming from addToCart
    // console.log(products);
    res.render("shop", {products , success});
});


router.get("/shop/discount", isLogin, async function(req,res){
    let products = await productmodel.find();
    let success = req.flash("success" ); //this success value is coming from addToCart
    // console.log(products);
    res.render("discountShop", {products , success});
});

router.get("/addToCart/:productId", isLogin, async function(req,res){
    let user = await usermodel.findOne({email: req.user.email});
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success" , "Added To Cart");
    res.redirect("/shop");

});

router.get("/discount/addToCart/:productId", isLogin, async function(req,res){
    let user = await usermodel.findOne({email: req.user.email});
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success" , "Added To Cart");
    res.redirect("/shop/discount");

});


router.get("/cart", isLogin, async function(req,res){
    let user = await usermodel.findOne({email: req.user.email}).populate("cart");

    
    const totalPrice = user.cart.reduce((sum, product) => sum + product.price, 0);
    const totalDiscount = user.cart.reduce((sum, product) => sum + (product.discount/100)*(product.price) , 0);
    const productNo = user.cart.length;

    // console.log(productNo);

    res.render("cart", {user,  totalPrice, totalDiscount, productNo});
    
});


router.post("/cart/delete", isLogin, async function(req, res){
    try {
        const { productId, userId } = req.body;
        let user = await usermodel.findById(userId);
        user.cart = user.cart.filter(id => id.toString() !== productId);
        await user.save();
        res.redirect("/cart");
    } catch (err) {
        res.status(500).send(err);
    }
});

// router.get("cart/payment", isLogin, async function(req,res){
//     res.render('payment')
// })
// /cart/delete/<%= cart._id %>
// router.get("/cart/payment", function(req,res){
//     // let error = req.flash("error");
//     res.render("payment");
// });

router.get("/gateway/payment/:amount", (req,res)=>{
    let amounts = (req.params.amount);
    
    res.render("paymentGateway", {amounts});
})

module.exports = router;