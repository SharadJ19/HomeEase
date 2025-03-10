import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Worker from "../models/Worker.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, city, role, services, cities, experience } = req.body;

    console.log("Received Registration Data:", req.body); // ✅ Debugging

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already in use"); // ✅ Debugging
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const newUser = new User({ name, email, password, city, role });
    await newUser.save();
    console.log("User created successfully:", newUser); // ✅ Debugging

    if (role === "worker") {
      console.log("Creating worker profile..."); // ✅ Debugging

      if (!services || !cities || experience === undefined) {
        console.log("Missing worker details"); // ✅ Debugging
        return res.status(400).json({ message: "Missing worker details" });
      }

      const workerData = {
        userId: newUser._id, // ✅ Correct: Use userId, NOT email
        services: services.split(",").map((s) => s.trim()),
        cities: cities.split(",").map((c) => c.trim()),
        experience: Number(experience),
      };

      console.log("Worker Data before saving:", workerData); // ✅ Debugging

      const newWorker = new Worker(workerData);
      await newWorker.save();

      console.log("Worker saved successfully:", newWorker); // ✅ Debugging
    }

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error); // ✅ Debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// ✅ Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Invalid email or role" });

    // Check password (NO HASHING)
    if (user.password !== password) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
