import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
});

const WorkerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    services: { type: [String], required: true },
    cities: { type: [String], required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: [ReviewSchema], default: [] },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;
