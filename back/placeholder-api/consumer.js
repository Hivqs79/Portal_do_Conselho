const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092', requestTimeout: 20000 });
const Consumer = kafka.Consumer;
const TOPIC = 'your-topic';
const consumer = new Consumer(
  client,
  [{ topic: TOPIC, partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  console.log('Received message:', message);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});

module.exports = consumer;