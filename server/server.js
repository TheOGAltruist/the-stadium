require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("../server/api/routes/auth.route.js");
const userRoutes = require("../server/api/routes/user.route.js");
const meRoutes = require("../server/api/routes/me.route.js")
const productRoutes = require('../server/api/routes/product.route.js');
const reviewRoutes = require('../server/api/routes/review.route.js');

// Body-parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));

// // logger middleware
// app.use((req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log("INFO: ", req.method, req.hostname, req.path, req.time, req.body);
//   next();
// });

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow credentials if needed
}));

// connect to port
const port = process.env.PORT;

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// use the imported API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/me", meRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

// Simple error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(statusCode).json({ message });
});