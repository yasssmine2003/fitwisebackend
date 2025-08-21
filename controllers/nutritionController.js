const DailyNutritionLog = require("../models/Nutrition");

// ✅ Récupérer tous les logs nutritionnels
exports.getAllNutritionLogs = async (req, res) => {
  try {
    const logs = await DailyNutritionLog.find().populate("userId", "email displayName");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer un log par ID
exports.getNutritionLogById = async (req, res) => {
  try {
    const log = await DailyNutritionLog.findById(req.params.id).populate("userId", "email displayName");
    if (!log) return res.status(404).json({ message: "Log nutritionnel non trouvé" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer tous les logs d’un utilisateur
exports.getNutritionLogsByUser = async (req, res) => {
  try {
    const logs = await DailyNutritionLog.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Créer un nouveau log nutritionnel
exports.createNutritionLog = async (req, res) => {
  try {
    const newLog = new DailyNutritionLog(req.body);
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Mettre à jour un log nutritionnel
exports.updateNutritionLog = async (req, res) => {
  try {
    const updated = await DailyNutritionLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Log nutritionnel non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Supprimer un log nutritionnel
exports.deleteNutritionLog = async (req, res) => {
  try {
    const deleted = await DailyNutritionLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Log nutritionnel non trouvé" });
    res.json({ message: "Log nutritionnel supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
