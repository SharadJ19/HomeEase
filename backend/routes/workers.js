import express from "express";
import Worker from "../models/Worker.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Get Workers based on service and city
router.get("/", async (req, res) => {
    try {
        const { service, city } = req.query;

        const workers = await Worker.find({
            services: service,
            cities: city,
        }).populate("userId", "name");

        res.json(workers);
    } catch (err) {
        console.error("Error fetching workers:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Get Worker Profile by Worker ID
router.get("/:workerId", async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.workerId).populate("userId", "name email");
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        res.json(worker);
    } catch (error) {
        console.error("❌ Error fetching worker details:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Get Worker Profile by User ID
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

// 🔹 Update Worker Profile
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) return res.status(404).json({ error: "Worker not found" });

        if (worker.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const updatedWorker = await Worker.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        res.json(updatedWorker);
    } catch (error) {
        console.error("❌ Error updating worker:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
