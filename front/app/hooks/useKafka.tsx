import { useEffect, useRef } from 'react';
import * as kafka from 'kafka-node';

const useKafka = () => {
    const consumers = useRef<{ topic: string; eventSource: EventSource }[]>([]);

    const addConsumer = (topic: string, onMessage: (message: kafka.Message) => void) => {
        if (!topic || typeof onMessage !== 'function') {
            console.error('You need to provide a topic and a callback function.');
            return;
        }

        const eventSource = new EventSource(`/api/kafkaConsumer?topic=${topic}`);

        eventSource.onopen = () => {
            console.log(`Conexão estabelecida com o tópico ${topic}`);
        };

        console.log('EventSource readyState:', eventSource.readyState);
        
        eventSource.onmessage = (event) => {
            console.log("Mensagem recebida no useKafka antes do parse:", event);
            const message = JSON.parse(event.data);
            console.log("Mensagem recebida no useKafka:", message);
            console.log("Mais um parse no useKafka:", JSON.parse(message.value));
            onMessage(message);
        };

        eventSource.onerror = (err) => {
            console.error(`Error in the connection to topic ${topic}:`, err);
            eventSource.close();
        };

        consumers.current.push({ topic, eventSource });

        console.log(`Consumer for topic "${topic}" was registered.`);
    };

    useEffect(() => {
        return () => {
            consumers.current.forEach(({ eventSource }) => eventSource.close());
            console.log('All consumers were closed.');
        };
    }, []);

    return { addConsumer };
};

export default useKafka;
