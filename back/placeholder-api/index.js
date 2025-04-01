const express = require("express");
const kafka = require("kafka-node");
const app = express();
const PORT = process.env.PORT || 3030;
const feedback = require("./responses/feedbacks.json");
const studentCouncil = require("./responses/studentCouncil.json");
const sendMessage = require("./producer");
const {consumer, consumer2} = require("./consumer");

app.use(express.json()); // Middleware to parse JSON

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to get feedbacks
app.get("/feedback", (req, res) => {
  res.send(feedback);
});

// Route to get student council information
app.get("/studentCouncil", (req, res) => {
  res.send(studentCouncil);
});

// Route to send message to Kafka
app.post("/send-message", (req, res) => {
  const { message } = req.body;
  console.log('Received request to send message:', message);
  sendMessage(message);
  res.status(200).json({ status: 'Message sent' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Placeholder server is running on port ${PORT}`);
  console.log('Starting producer and consumer...');
});