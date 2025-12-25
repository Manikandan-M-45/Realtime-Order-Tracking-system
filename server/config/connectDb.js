const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
  const URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(URI)
    console.log("Database connected...")
  } catch (error) {
    console.log("Error in connection string: ", error.message);
  }
}

module.exports = connectDb;