import * as kafka from 'kafka-node';

export default function kafkaConsumer(TOPIC: string) {
    const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9093', requestTimeout: 40000 });
    const Consumer = kafka.Consumer;
    const consumer = new Consumer(
      client,
      [{ topic: TOPIC, partition: 0 }],
      { autoCommit: true }
    );
    
    consumer.on('message', (message: kafka.Message) => {
        console.log('Received message in utils/kafkaConsumer:', message);
    });
    
    consumer.on('error', (err) => {
      console.error('Consumer error:', err);
    });

    return consumer;
}