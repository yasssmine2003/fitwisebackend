
const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type_activite: String,
  dureeMin: Number,
  calories_burned: Number,
  date: { type: Date, default: Date.now },
});

module.exports= mongoose.model("Activity", activitySchema);

