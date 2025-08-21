
import mongoose from "mongoose";

const wellbeingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  energie: Number,
  humeur: Number,
  sommeil: Number,
  stress: Number,
  notes: String,
});

export default mongoose.model("Wellbeing", wellbeingSchema);

