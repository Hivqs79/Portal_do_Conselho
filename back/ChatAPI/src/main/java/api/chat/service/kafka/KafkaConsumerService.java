package api.chat.service.kafka;

import api.chat.entities.Notification;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "room1", groupId = "group_id")
    public void consume(String message) {
        System.out.println("logDoBackend" + "Consumed message: " + message);
    }
}