const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Routes
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes(io));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
