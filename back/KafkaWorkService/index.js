const express = require("express");
const kafka = require("kafka-node");

const app = express();
app.use(require("cors")());

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });
const consumer = new kafka.Consumer(
  kafkaClient,
  [{ topic: "notification16", partition: 0 }],
  { autoCommit: true }
);

app.get("/events", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Conexão SSE iniciada");

  consumer.on("message", (message) => {
    console.log("Mensagem recebida na api:", message);
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  req.on("close", () => {
    res.end();
  });
});

app.listen(3090, () => console.log("Work Service rodando na porta 3090"));
