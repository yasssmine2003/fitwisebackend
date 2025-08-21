
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  displayName: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,

  profilPhysique: {
    age: Number,
    poidsKg: Number,
    tailleCm: Number,
    niveau: String,
  },

  profilNutrition: {
    age: Number,
    poidsKg: Number,
    tailleCm: Number,
    objectif: { type: String, enum: ["Perte", "Maintien", "Prise"] },
  },
});
module.exports = mongoose.model("User", userSchema);

