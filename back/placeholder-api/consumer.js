const kafka = require('kafka-node');
  const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9093', requestTimeout: 40000 });
  const Consumer = kafka.Consumer;
  const TOPIC = 'notification16';
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