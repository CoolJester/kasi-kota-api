const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const app = express();

const port = 8080;

// Middleware
app.use(express.json());

// Security Middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(mongoSanitize());
app.use(xss());

// Rate Limiting requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 10 min
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);

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

// Serving the images to the public
app.use('/static', express.static('static'));

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
