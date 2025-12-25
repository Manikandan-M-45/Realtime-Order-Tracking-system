const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

module.exports = (io) => {
  router.post("/", orderController.createOrder(io));
  router.put("/:id/status", orderController.updateOrderStatus(io));
  router.get("/", orderController.getAllOrders);
  router.get("/:id", orderController.getOrderById);

  return router;
};
