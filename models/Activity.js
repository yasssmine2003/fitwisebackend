// src/models/Activity.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: String,
  dureeMin: Number,
  calories: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Activity", activitySchema);

