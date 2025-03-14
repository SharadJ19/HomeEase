import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Import middleware

const router = express.Router();

// 📌 Protected Route: Create a Booking (Requires Token)
router.post("/", verifyToken, async (req, res) => {
    try {
        const { workerId, service, city, date } = req.body;

        // Ensure the user is logged in (middleware already verified the token)
        if (!req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const newBooking = new Booking({
            userId: req.user.userId, // ✅ Get user ID from decoded token
            workerId,
            service,
            city,
            date,
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful!" });
    } catch (error) {
        console.error("❌ Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Get Bookings (For Users & Workers)
router.get("/", verifyToken, async (req, res) => {
    try {
        const { userId, workerId } = req.query;

        let query = {};
        if (userId) query.userId = new mongoose.Types.ObjectId(userId);
        if (workerId) query.workerId = new mongoose.Types.ObjectId(workerId); // ✅ Fix here

        const bookings = await Booking.find(query).sort({ date: -1 });
        res.json(bookings);
    } catch (error) {
        console.error("❌ Fetch Bookings Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Update Booking Status (Worker Only)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ error: "Booking not found" });

        // Ensure only assigned worker can update status
        if (booking.workerId.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        booking.status = status;
        await booking.save();
        res.json(booking);
    } catch (error) {
        console.error("❌ Update Booking Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


export default router;
