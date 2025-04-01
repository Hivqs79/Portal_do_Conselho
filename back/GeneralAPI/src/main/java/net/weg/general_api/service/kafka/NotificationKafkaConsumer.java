package net.weg.general_api.service.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.service.notification.NotificationService;
import org.springframework.kafka.KafkaException;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class NotificationKafkaConsumer {
    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "notification16", groupId = "notification_group")
    public void consumeNotification(String message) {
        try {
            System.out.println("Notification: " + message);
        } catch (Exception e) {
            throw new KafkaException("Error processing notification message: " + e.getMessage());
        }
    }
}
