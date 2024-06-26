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

router.patch("/users/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .populate("favourites")
    .then((updatedUser) => {
      const { _id, email, name, favourites } = updatedUser; //take out password hash
      const newUpdatedUser = { _id, email, name, favourites };
      res.json(newUpdatedUser);
    })
    .catch((err) => console.log("Update one user error: ", err));
});
module.exports = router;
