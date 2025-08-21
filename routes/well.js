const express = require("express");
const router = express.Router();
const wellbeingController = require("../controllers/wellbeingcontroller");

// CRUD routes
router.get("/getAllWellbeing", wellbeingController.getAllWellbeing);
router.get("/getWellbeingById:id", wellbeingController.getWellbeingById);
router.get("/user/:userId", wellbeingController.getWellbeingByUser);
router.post("/createWellbeing", wellbeingController.createWellbeing);
router.put("/updateWellbeing:id", wellbeingController.updateWellbeing);
router.delete("/deleteWellbeing:id", wellbeingController.deleteWellbeing);

module.exports = router;
