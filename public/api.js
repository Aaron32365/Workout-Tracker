const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    console.log("Data to be sent to backend: " + JSON.stringify(data))
    const id = location.search.split("=")[1];
    console.log("front end id: " + id)
    const res = await fetch("/api/workouts/" + id, { 
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    console.log("Data being sent to back end: " + JSON.stringify(data))
    const res = await fetch("/api/workouts", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
