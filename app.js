const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

const app = express();

const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Load the default ENV file first to access ENV
dotenv.config({ path: './config/config.env' });

// Load the specific environment config
if (process.env.ENV === 'local') {
  dotenv.config({ path: './config/config.Local.env' });
}

console.log(`Staring app in the ${process.env.ENV} environment`);

// Dev logging middleware
if (process.env.ENV === "local") {
  app.use(morgan("dev"));
}

//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB".cyan))
  .catch((err) => {
    console.log("Failed to connect to DB".red);
    console.log(err);
  });

// Import routes
const healthRoutes = require("./routes/healthCheck");
const menuRoutes = require("./routes/menu");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

// Use routes
app.use("/api", healthRoutes);
app.use("/api", menuRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);

//Page not found
app.use("/", (req, res) => {
  res.status(404).json({
    status: "Url not found",
  });
});

// Start server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`.bgGreen);
});
