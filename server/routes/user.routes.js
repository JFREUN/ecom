const User = require("../models/user.model");
const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/users", (req, res, next) => {
  User.find()
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch((err) => console.log("Get user error: ", err));
});

module.exports = router;
