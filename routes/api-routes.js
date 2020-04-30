const express = require("express");

const router = express.Router();
const db = require("../models")
const mongojs = require("mongojs")

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", { useNewUrlParser: true });

router.get("/workouts", (req, res) => {
  db.Workout.find({}, (err, found) => {
    console.log("Data found: " + found)
    res.send(found)
  })
});

router.post("/workouts", (req, res) => {
    db.Workout.create({}, (err, created) => {
      if(err) throw(err)
      console.log("New workout created: " + created)
      res.send(created)
    }) 
  });

router.put("/workouts/:id", (req, res) => {
  const id = req.params.id
  console.log( "req.body: " + req.body)
  console.log("back end id:" + id)
  db.Workout.find({
    _id: mongojs.ObjectId(id)
  }, (err, dataFound) => {
    if(err) throw(err)

  })// if type === "cardio" then input body data into cardio db, else resistence
  // // db.Workout.update({
  //   _id: mongojs.ObjectId(id)
  // }, {
  //   $set: {

  //   }
  // })
});

module.exports = router;