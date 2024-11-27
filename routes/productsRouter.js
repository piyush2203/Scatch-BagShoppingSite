const express = require("express");

const router = express.Router();
const upload = require("../config/multerConfig");
const productModel = require("../models/productmodel");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "product created successfully");
    res.redirect("/owners/admin");
  } catch (error) {
    res.send(error.messsage);
  }
});

module.exports = router;
