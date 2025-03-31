import { NextApiRequest, NextApiResponse } from 'next';
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-client',
  brokers: ['localhost:9092']
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Obter userId do localStorage (simulado via query param)
  const userId = localStorage.getItem("userNotificationId")

  if (!userId) {
    res.status(400).end();
    return;
  }

  // Criar consumer do Kafka
  const consumer = kafka.consumer({ groupId: `notifications-${userId}` });
  
  await consumer.connect();
  await consumer.subscribe({ topic: 'notification', fromBeginning: false });

  // Enviar keep-alive periodicamente
  const keepAliveInterval = setInterval(() => {
    res.write(':keep-alive\n\n');
  }, 30000);

  // Consumir mensagens do Kafka
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const notification = JSON.parse(message.value?.toString() || '');
        
        // Verificar se a notificação é para este usuário
        if (notification.userId.toString() === userId) {
          res.write(`data: ${JSON.stringify(notification)}\n\n`);
        }
      } catch (error) {
        console.error('Error processing Kafka message:', error);
      }
    },
  });

  // Limpar quando a conexão for fechada
  req.on('close', () => {
    clearInterval(keepAliveInterval);
    consumer.disconnect();
    res.end();
  });
}