const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ExerciseSchema = new Schema({
    type: {
      type: String,
    },
    name: {
      type: String,
      maxlength: 25, 
      unique: true
    },
  
    // distance and duration fields are if the exercise type is cardio
    distance: {
      type: Number,
      min: [0, "Must Enter value greater than 0"],
      max: 1000,
    },
    duration: {
      type: Number,
      min: [0, "Must Enter value greater than 0"],
      max: 1000,
    },
  
    // these fields are if the exercise type is resistance
    weight: {
      type: Number
    },
    sets: {
      type: Number
    },
    reps: {
      type: Number
    },
    duration: {
      type: Number
    }
  })

  const Exercise = mongoose.model("Exercise", ExerciseSchema);

  module.exports = Exercise