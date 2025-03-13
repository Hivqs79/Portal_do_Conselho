const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const feedback = require("./responses/feedbacks.json");
const studentCouncil = require("./responses/studentCouncil.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//resolve CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/feedback", (req, res) => {
  res.send(feedback);
});

app.get("/studentCouncil", (req, res) => {
  res.send(studentCouncil);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
