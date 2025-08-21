const ActivityModel = require("../models/Activity");

// ✅ Récupérer toutes les activités
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await ActivityModel.find().populate("userId", "email displayName");
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer une activité par ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await ActivityModel.findById(req.params.id).populate("userId", "email displayName");
    if (!activity) return res.status(404).json({ message: "Activité non trouvée" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupérer toutes les activités d’un utilisateur spécifique
exports.getActivitiesByUser = async (req, res) => {
  try {
    const activities = await ActivityModel.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Créer une nouvelle activité
exports.createActivity = async (req, res) => {
  try {
    const newActivity = new ActivityModel(req.body);
    const saved = await newActivity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Mettre à jour une activité
exports.updateActivity = async (req, res) => {
  try {
    const updated = await ActivityModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Activité non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Supprimer une activité
exports.deleteActivity = async (req, res) => {
  try {
    const deleted = await ActivityModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Activité non trouvée" });
    res.json({ message: "Activité supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
