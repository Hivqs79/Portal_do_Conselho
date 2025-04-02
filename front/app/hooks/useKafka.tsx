import { useEffect, useRef } from 'react';
import * as kafka from 'kafka-node';

const useKafka = () => {
    const consumers = useRef<{ topic: string; eventSource: EventSource }[]>([]);

    const addConsumer = (topic: string, onMessage: (message: kafka.Message) => void) => {
        if (!topic || typeof onMessage !== 'function') {
            console.error('You need to provide a topic and a callback function.');
            return;
        }
        console.log("teste1");
        const eventSource = new EventSource(`/api/kafkaConsumer?topic=${topic}`);
        console.log("teste2");

        eventSource.onopen = () => {
            console.log(`Conexão estabelecida com o tópico ${topic}, status ${eventSource.readyState}`);            
        };

        console.log('EventSource readyState:', eventSource.readyState);
        
        eventSource.onmessage = (event) => {
            console.log("Mensagem recebida no useKafka antes do parse:", event);
            try {
              const message = JSON.parse(event.data);
              console.log("Mensagem recebida no useKafka:", message);
              const parsedMessage = JSON.parse(message.value.toString());
              console.log("Mais um parse com .toString no useKafka:", parsedMessage);
              console.log("Mais um parse no useKafka:", JSON.parse(message.value));
              onMessage(message);
            } catch (error) {
              console.error("Erro ao processar a mensagem:", error);
            }
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
