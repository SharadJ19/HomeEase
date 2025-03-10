import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import AuthRoutes from "./routes/AuthRoutes.js";
import workersRoutes from "./routes/workers.js";
import bookingsRoutes from "./routes/bookings.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB, DB -> Homeease"));

// API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/workers", workersRoutes);
app.use("/api/bookings", bookingsRoutes);

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });

  console.log("🟢 Running in PRODUCTION mode: Serving frontend...");
} else {
  console.log("🟡 Running in DEVELOPMENT mode...");
}

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
