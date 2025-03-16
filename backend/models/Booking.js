import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
    service: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "completed", "cancelled"], default: "pending" },
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
