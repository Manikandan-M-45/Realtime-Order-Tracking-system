const Product = require("../models/product.model");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    if (!name || !price || stock === undefined) {
      return res.status(400).json({ message: "Required fields missing" });
    }
    const product = await Product.create({ name, description, price, stock, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
