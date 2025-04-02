const express = require("express");
const kafka = require("kafka-node");

const app = express();
app.use(require("cors")());

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });
const consumer = new kafka.Consumer(
  kafkaClient,
  [{ topic: "notification", partition: 0 }],
  { autoCommit: true }
);

const clients = {};

app.get("/events/notifications/:userId", (req, res) => {
  const userId = req.params.userId;
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log(`Conexão SSE iniciada para o usuário: ${userId}`);

  clients[userId] = res;

  req.on("close", () => {
    console.log(`Conexão fechada para o usuário: ${userId}`);
    delete clients[userId];
  });
});

consumer.on("message", (message) => {
  console.log("Mensagem recebida:", message);

  try {
    const data = JSON.parse(message.value);
    const userId = message.value.match(/"userId":(\d+)/)[1];
    
    if (clients[userId]) {
      clients[userId].write(`data: ${JSON.stringify(data)}\n\n`);
    }
  } catch (error) {
    console.error("Erro ao processar mensagem:", error);
  }
});

app.listen(3090, () => console.log("Work Service rodando na porta 3090"));
