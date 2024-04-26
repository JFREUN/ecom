const Order = require("../models/order.model");
const router = require("express").Router();

router.post("/orders", (req, res, next) => {
  const {
    shippingInfo,
    user,
    orderStatus,
    paymentInfo,
    createdAt,
    orderItems,
  } = req.body;

  Order.create({
    shippingInfo,
    user,
    orderStatus,
    paymentInfo,
    createdAt,
    orderItems,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.json(err));
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
