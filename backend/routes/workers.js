import express from "express";
import Worker from "../models/Worker.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ Import middleware

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { service, city } = req.query;

        // Find workers with the requested service and city
        const workers = await Worker.find({
            services: service,
            cities: city,
        }).populate("userId", "name"); // Populate 'name' from User model

        res.json(workers);
    } catch (err) {
        console.error("Error fetching workers:", err);
        res.status(500).json({ error: "Server error" });
    }
});


// 📌 Get Worker Data by User ID
router.get("/user/:userId", verifyToken, async (req, res) => {
    try {
        const worker = await Worker.findOne({ userId: req.params.userId });
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        res.json(worker);
    } catch (error) {
        console.error("❌ Error fetching worker:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
