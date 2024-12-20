require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");

// Body-parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));

// connect to port
const port = process.env.PORT;

// Connect and listen on specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// use the imported API routes
app.use("/api", routes);

// Simple error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal Server Error";
  res.status(status).json({ message });
});