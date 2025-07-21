const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Gym Management Backend Running");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
