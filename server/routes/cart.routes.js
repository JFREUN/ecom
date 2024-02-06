const mongoose = require("mongoose");
const Cart = require("../models/cart.module");
const Product = require("../models/product.model");
const router = require("express").Router();

router.get("/cart/:userId", (req, res, next) => {
  const { userId } = req.params;

  Cart.find({ owner: userId })
    .then((cart) => {
      const foundCart = cart[0];
      if (foundCart && foundCart.items.length > 0) {
        res.status(200).json(foundCart);
      } else {
        res.status(404).send({ message: "Cart not found" });
      }
    })
    .catch((err) => console.log("Post product error: ", err));
});

// POST route for creating a new cart
router.post("/cart", async (req, res) => {
  //   const owner = req.user._id;

  const { userId } = req.body;
  const owner = userId;
  try {
    const existingCart = await Cart.findOne({ owner });
    if (existingCart) {
      // Cart already exists for the user
      res.status(400).send("Cart already exists for this user.");
      return;
    }
    // Create a new cart
    const newCart = await Cart.create({ owner, items: [], bill: 0 });
    res.status(201).send(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.patch("/cart", async (req, res) => {
  //   const owner = req.user._id;
  const { userId, itemId, quantity, action } = req.body;
  const owner = userId;
  try {
    const cart = await Cart.findOne({ owner });
    const item = await Product.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    const price = item.price;
    const name = item.name;

    const existingItemIndex = cart.items.findIndex(
      (item) => item.itemId == itemId
    );

    if (existingItemIndex > -1 && action === "A") {
      // Item already exists in the cart, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else if (existingItemIndex > -1 && action === "D") {
      //Item exists, update its quantity
      cart.items[existingItemIndex].quantity -= quantity;
    } else if (existingItemIndex === -1 && action === "A") {
      // Item does not exist in the cart, add it
      cart.items.push({ itemId, name, quantity, price });
    } else if (existingItemIndex === -1 && action === "A") {
      // Item does not exist in the cart, add it
      return res.status(404).send({ message: "Product not cart" });
    }

    // Recalculate the total bill
    cart.bill = cart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/cart/:cartId", (req, res, next) => {
  const { cartId } = req.params;

  Product.findByIdAndRemove(cartId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("Update one product error: ", err);
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;
