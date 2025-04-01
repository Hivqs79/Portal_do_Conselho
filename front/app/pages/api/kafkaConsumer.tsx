import kafkaConsumer from '@/utils/KafkaConsumer';

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { topic } = req.query;

    if (!topic) {
        res.status(400).json({ error: 'No topic provided' });
        return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const consumer = kafkaConsumer(topic);

    consumer.on('message', (message) => {
        console.log('Mensagem recebida na api:', message);
        console.log('Cliente conectado:', req.headers);

        res.write(`data: ${JSON.stringify(message)}\n\n`);
    });

    consumer.on('error', (err) => {
        console.error('Kafka consumer error:', err);
        res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
    });

    req.on('close', () => {
        console.log('Closed connection with client');
        consumer.close(true, () => {
            console.log('Closed Kafka consumer');
        });
        res.end();
    });
}
