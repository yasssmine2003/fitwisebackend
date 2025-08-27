const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, match:[/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
  password: { type: String, required: true, minlength: 6 },
  username: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  profilPhysique: { age: Number, poidsKg: Number, tailleCm: Number, niveau: String },
  profilNutrition: { age: Number, poidsKg: Number, tailleCm: Number, objectif: { type: String, enum: ["Perte", "Maintien", "Prise"] } },
});

// Hash le mot de passe seulement si modifié et n'oublie pas next()
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    if (this.isNew) {
      this.status = false; // si tu veux que le statut soit false seulement à la création
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
