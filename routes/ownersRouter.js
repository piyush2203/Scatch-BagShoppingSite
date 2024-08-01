const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const ownerModel = require("../models/ownermodel");
dotenv.config();

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(403).send("You Don't have permission to create a new owner ");
    }

    let {fullname, email, password}= req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}





router.get("/admin", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", {success});
});

module.exports = router;
