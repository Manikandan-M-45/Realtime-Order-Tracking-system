const Order = require("../models/order.model");

// CREATE ORDER
exports.createOrder = (io) => async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;
    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }
    const order = await Order.create({
      orderNumber: "ORDER-" + Date.now(),
      customer,
      items,
      totalAmount
    });

    io.emit("newOrderPlaced", order);
    console.log("backen order")
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = (io) => async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    io.emit("orderStatusUpdated", order);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
