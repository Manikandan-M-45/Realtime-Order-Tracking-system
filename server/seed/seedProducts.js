const Product = require("../models/product.model");
require("../config/connectDb")();

const seedProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  const products = data.map(p => ({
    name: p.title,
    price: p.price,
    imageUrl: p.image,
    category: p.category,
    description: p.description,
    stock: Math.floor(Math.random() * 20) + 1
  }));

  await Product.insertMany(products);
  console.log("Products seeded");
  process.exit();
};

seedProducts();
