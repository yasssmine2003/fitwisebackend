const express = require("express");
const router = express.Router();
const nutritionController = require("../controllers/nutritionController");

// CRUD routes
router.get("/getAllNutritionLogs", nutritionController.getAllNutritionLogs);
router.get("/getNutritionLogById:id", nutritionController.getNutritionLogById);
router.get("/user/:userId", nutritionController.getNutritionLogsByUser);
router.post("/getNutritionLogsByUser", nutritionController.createNutritionLog);
router.put("/updateNutritionLog:id", nutritionController.updateNutritionLog);
router.delete("/deleteNutritionLog:id", nutritionController.deleteNutritionLog);

module.exports = router;
