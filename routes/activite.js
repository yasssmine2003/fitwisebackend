const express = require("express");
const router = express.Router();
const activitiesController = require("../controllers/activitescontroller");

// CRUD routes
router.get("/getAllActivities", activitiesController.getAllActivities);
router.get("/getActivityById:id", activitiesController.getActivityById);
router.get("/user/:userId", activitiesController.getActivitiesByUser);
router.post("/createActivity", activitiesController.createActivity);
router.put("/updateActivity:id", activitiesController.updateActivity);
router.delete("/deleteActivity:id", activitiesController.deleteActivity);

module.exports = router;
