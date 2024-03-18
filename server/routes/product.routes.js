const Product = require("../models/product.model");
const mongoose = require("mongoose");
const router = require("express").Router();

router.post("/products", (req, res, next) => {
  const { name, description, price } = req.body;

  Product.create({
    name,
    description,
    price,
    rating: 0,
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

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

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
