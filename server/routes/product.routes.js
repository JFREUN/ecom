const Product = require("../models/product.model");
const mongoose = require("mongoose");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

router.post("/products", (req, res, next) => {
  const { name, description, price, imageUrl } = req.body;

  Product.create({
    name,
    description,
    price,
    rating: 0,
    imageUrl,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.json(err));
});

router.get("/products", (req, res, next) => {
  Product.find()
    .then((allProducts) => {
      res.status(200).json(allProducts);
    })
    .catch((err) => console.log("Post product error: ", err));
});

router.get("/products/search", (req, res, next) => {
  Product.find({ name: { $regex: req.query.name } })
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => console.log("Post product error: ", err));
});

router.get("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(productId)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => console.log("Get one product error: ", err));
});

router.post(
  "/products/image/upload",
  fileUploader.single("imageUrl"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

router.put("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndUpdate(productId, req.body, { new: true })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => console.log("Update one product error: ", err));
});

router.delete("/products/:productId", (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndRemove(productId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log("Update one product error: ", err));
});

module.exports = router;
