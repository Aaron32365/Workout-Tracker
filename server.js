const express = require("express");

const app = express();
const { htmlRoutes, apiRoutes } = require("./routes"); 
// destructuring the module.exports object that routes/index.js is exporting into its two properties

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Then use those routes in your app:
app.use(htmlRoutes); 
app.use("/api", apiRoutes); // the "/api" as the first argument here will route any requests that start with /api to that router

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

