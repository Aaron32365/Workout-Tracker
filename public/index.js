init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    console.log("grabbing last workout")
    const workout = await API.getLastWorkout();
    console.log("last workout: " + workout)
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}