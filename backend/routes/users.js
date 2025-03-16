import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Get User Profile
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 🔹 Update User Profile
router.put("/:id", verifyToken, async (req, res) => {
    try {
        if (req.user.userId !== req.params.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select("-password");

        res.json(updatedUser);
    } catch (error) {
        console.error("❌ Error updating user:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
