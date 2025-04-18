package net.weg.general_api.service.kafka;

import lombok.AllArgsConstructor;
import org.springframework.kafka.KafkaException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NotificationKafkaConsumer {

    @KafkaListener(topics = "notification", groupId = "group_notification")
    public void consumeNotification(String message) {
        try {
            System.out.println("logDoBackend" + "Notification kc: " + message);
        } catch (Exception e) {
            throw new KafkaException("Error processing notification message: " + e.getMessage());
        }
    }
}
