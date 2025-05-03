/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express");
const kafka = require("kafka-node");
const cors = require("cors");

const app = express();
app.use(cors());

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });
const consumer = new kafka.Consumer(
  kafkaClient,
  [
    { topic: "notification", partition: 0 },
    { topic: "chat_messages", partition: 0 },
    { topic: "room_events", partition: 0 }
  ],
  { autoCommit: true }
);

// Objeto para armazenar todas as conexões
const connections = {
  notifications: {},
  chats: {},
  rooms: {}
};

// Endpoint para notificações
app.get("/events/notifications/:userId", (req, res) => {
  const userId = req.params.userId;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log(`Conexão SSE iniciada para notificações do usuário: ${userId}`);

  // Armazena a conexão
  connections.notifications[userId] = res;

  req.on("close", () => {
    console.log(`Conexão de notificação fechada para o usuário: ${userId}`);
    delete connections.notifications[userId];
  });
});

app.get("/events/rooms/:userId", (req, res) => {
  const userId = req.params.userId;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log(`Conexão SSE iniciada para atualizações de sala do usuário: ${userId}`);

  connections.rooms[userId] = res;

  req.on("close", () => {
    console.log(`Conexão de sala fechada para o usuário: ${userId}`);
    delete connections.rooms[userId];
  });
});

// Endpoint para chat
app.get("/events/chat/:roomId/:userId", (req, res) => {
  const { roomId, userId } = req.params;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  

  console.log(
    `Conexão SSE iniciada para chat na sala ${roomId} (usuário ${userId})`
  );

  // Inicializa a sala se não existir
  if (!connections.chats[roomId]) {
    connections.chats[roomId] = {};
  }

  // Armazena a conexão
  connections.chats[roomId][userId] = res;

  req.on("close", () => {
    console.log(
      `Conexão de chat fechada para sala ${roomId} (usuário ${userId})`
    );
    delete connections.chats[roomId][userId];

    // Remove a sala se não houver mais conexões
    if (Object.keys(connections.chats[roomId]).length === 0) {
      delete connections.chats[roomId];
    }
  });
});

consumer.on("message", (message) => {
  console.log("Mensagem recebida:", message.topic, message.value);

  try {
    const data = JSON.parse(message.value);

    // Notificações
    if (message.topic === "notification") {
      const userId = data.userId || (data.data && data.data.userId);

      if (!userId) {
        console.error("UserId não encontrado na mensagem:", message.value);
        return;
      }

      if (connections.notifications[userId]) {
        console.log(`Enviando notificação para usuário ${userId}`);
        connections.notifications[userId].write(
          `data: ${JSON.stringify(data)}\n\n`
        );
      }
    }
    // Mensagens de chat
    else if (message.topic === "chat_messages") {
      const parsedData = JSON.parse(data.object); // Parse o objeto dentro da mensagem

      if (parsedData.type === "chat_message") {
        const roomId = parsedData.roomId;
        const messageData = parsedData.message;

        // Envia a mensagem para todos os usuários conectados naquela sala
        if (connections.chats[roomId]) {
          Object.values(connections.chats[roomId]).forEach((client) => {
            client.write(`data: ${JSON.stringify(messageData)}\n\n`);
          });
        }
      }
    } else if (message.topic === "room_events") {
      const parsedData = JSON.parse(data.object);
      
      if (parsedData.type === "room_created") {
        parsedData.usersId.forEach(userId => {
          if (connections.rooms[userId]) {
            connections.rooms[userId].write(
              `data: ${JSON.stringify({ type: "room_created", room: parsedData.room })}\n\n`
            );
          }
        });
      }
    }
  } catch (error) {
    console.error(
      "Erro ao processar mensagem:",
      error,
      "Mensagem original:",
      message.value
    );
  }
});

consumer.on("error", (err) => {
  console.error("Erro no consumer Kafka:", err);
});

app.listen(3090, () => {
  console.log("Serviço de eventos rodando na porta 3090");
  console.log("Endpoints disponíveis:");
  console.log("- GET /events/notifications/:userId");
  console.log("- GET /events/chat/:roomId/:userId");
  console.log("- GET /events/room/:userId");
});
