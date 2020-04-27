const express = require("express");
const router = express.Router();
const db = require("../models")

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
});

module.exports = router;