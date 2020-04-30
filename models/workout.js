const mongoose = require("mongoose")
const schema = mongoose.schema

const WorkoutSchema = new schema({
    exercises: [{
        type: schema.Types.objectId,
        ref: "Exercise"

    }]
})

const Workout = mongoose.model("Workout", WorkoutSchema)
module.exports = Workout