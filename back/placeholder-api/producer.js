const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092', requestTimeout: 20000 });
const Producer = kafka.Producer;
const producer = new Producer(client);

const TOPIC = 'your-topic';

producer.on('ready', () => {
  console.log('Producer is ready');
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

const sendMessage = (message) => {
  const payloads = [
    { topic: TOPIC, messages: message },
  ];

  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Error sending message:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

module.exports = sendMessage;