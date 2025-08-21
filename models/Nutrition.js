// src/models/Nutrition.js
import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema({
  foodName: String,
  calories: Number,
  proteinG: Number,
  carbsG: Number,
  fatG: Number,
  quantity: Number,
  unit: String,
});

const mealSchema = new mongoose.Schema({
  type: { type: String, enum: ["PetitDejeuner", "Dejeuner", "Diner", "Collation"] },
  note: String,
  items: [mealItemSchema],
});

const dailyNutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  meals: [mealSchema],
});

export default mongoose.model("DailyNutritionLog", dailyNutritionSchema);

