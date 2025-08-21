const Wellbeing = require("../models/Wellbeing");

// ✅ Récupérer tous les logs bien-être
exports.getAllWellbeing = async (req, res) => {
  try {
    const logs = await Wellbeing.find().populate("userId", "email displayName");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer un log par ID
exports.getWellbeingById = async (req, res) => {
  try {
    const log = await Wellbeing.findById(req.params.id).populate("userId", "email displayName");
    if (!log) return res.status(404).json({ message: "Log bien-être non trouvé" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer tous les logs d’un utilisateur
exports.getWellbeingByUser = async (req, res) => {
  try {
    const logs = await Wellbeing.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Créer un nouveau log bien-être
exports.createWellbeing = async (req, res) => {
  try {
    const newLog = new Wellbeing(req.body);
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Mettre à jour un log bien-être
exports.updateWellbeing = async (req, res) => {
  try {
    const updated = await Wellbeing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Log bien-être non trouvé" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Supprimer un log bien-être
exports.deleteWellbeing = async (req, res) => {
  try {
    const deleted = await Wellbeing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Log bien-être non trouvé" });
    res.json({ message: "Log bien-être supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
