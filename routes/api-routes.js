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

  router.put('/workouts/:id', async (req,res) => {
    const workoutID = req.params.id;
    let {name, distance, duration, weight, sets, reps, type} = req.body;
    console.log("workout id:" + JSON.stringify(workoutID))
  
    if (type === "cardio") {
      try {
        let msg = await handleCardioUpdate(type, name, distance, duration, workoutID);
        return res.json(msg);
      } catch (error) {
        console.log(error);
        return;
      } 
    } else if (type === "resistance") {
      try {
        let msg = await handleResistanceUpdate(type, name, weight, sets, reps, duration, workoutID);
        return res.json(msg);
      } catch (error) {
        console.log(error);
        return;
      } 
    }
  })

  router.get("/workouts/range", (req,res) => {
    let endDate = new Date();
  
    // example of finding items between date
    db.Workout.find({day: {$lte : endDate} }).populate("exercises").exec(function(err, docs) {
      if (err) {
        throw err;
      } else {
        res.json(docs);
      }
    })
  })

  function handleCardioUpdate(type, name, distance, duration, workoutID) {
    return new Promise((resolve,reject) => {
      let exercise_id;

      db.Exercise.create({type: type, name: name, distance: distance, duration: duration}, function(err, doc) {
        if (err) {
          return reject(err);
        } else {
          console.log(doc);
          exercise_id = doc._id;
          db.Workout.updateOne({_id: workoutID}, {$push: {exercises: exercise_id}, $inc: {totalDuration: duration}}, function(err, res) {
            if (err) {
              return reject("Could not update Workout Collection");
            }
            return resolve("Added Exercise Successfully");
          });
        }
      });
    })
  }
  
  
  // create resistance exercise and add to workout collection
  function handleResistanceUpdate(type, name, weight, sets, reps, duration, workoutID) {
    return new Promise((resolve,reject) => {
      let exercise_id;

      db.Exercise.create({type: type, name: name, weight: weight, sets: sets, reps: reps, duration: duration}, function(err, doc) {
        if (err) {
          return reject(err);
        } else {
          console.log("exercise created: "+ JSON.stringify(doc))
          exercise_id = doc._id;
          console.log(JSON.stringify(exercise_id))
          db.Workout.updateOne({_id: workoutID}, {$push: {exercises: exercise_id}, $inc: {totalDuration: duration}}, function(err, res) {
            if (err) {
              return reject("Could not update Workout Collection");
            }
            
            return resolve("Added Exercise Successfully");
          });
        }
      });
    })
  }

module.exports = router;