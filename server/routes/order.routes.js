const Order = require("../models/order.model");
const User = require("../models/user.model");
const router = require("express").Router();

// Create a new order
router.post("/orders", async (req, res) => {
  try {
    const { user, shippingInfo, paymentInfo, orderItems } = req.body;

    // Validate user
    const userExists = await User.findById(user);
    if (!userExists) {
      console.error(`Invalid user ID: ${user}`);
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Create new order
    const newOrder = await Order.create({
      shippingInfo,
      user,
      paymentInfo,
      orderItems,
    });

    console.log("New Order created", newOrder);
    res.status(200).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/orders", (req, res, next) => {
  Order.find()
    .then((allOrders) => {
      res.status(200).json(allOrders);
    })
    .catch((err) => console.log("Get all orders error: ", err));
});

router.get("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findById(orderId)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => console.log("Get one order error: ", err));
});

router.put("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  Order.findByIdAndUpdate(orderId, req.body, { new: true })
    .then((updatedOrder) => {
      res.json(updatedOrder);
    })
    .catch((err) => console.log("Update one order error: ", err));
});

router.delete("/orders/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  Order.findByIdAndRemove(orderId)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => console.log("Update one order error: ", err));
});

module.exports = router;
