import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import AuthRoutes from "./routes/AuthRoutes.js";
import workersRoutes from "./routes/workers.js";
import bookingsRoutes from "./routes/bookings.js";
import usersRoutes from "./routes/users.js";  

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB, DB -> Homeease"));

// ✅ Register API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", usersRoutes); 
app.use("/api/workers", workersRoutes);
app.use("/api/bookings", bookingsRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
