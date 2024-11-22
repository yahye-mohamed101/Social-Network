import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';

import routes from "./api/routes/index.js"; // Centralized routes file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use("/api", routes);

// Catch-all for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handling middleware
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack); // Log error stack trace
  res.status(500).json({ error: "An internal server error occurred" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
