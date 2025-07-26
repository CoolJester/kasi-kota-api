const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Import routes
const healthRoutes = require("./routes/healthCheck");
const menuRoutes = require("./routes/menu");

// Use routes
app.use("/api", healthRoutes);
app.use("/api", menuRoutes);

// Root route
app.get("/", (req, res) => {
  res.statusCode = 404;
  res.send("nothing to do here tbh");
});

// Start server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
