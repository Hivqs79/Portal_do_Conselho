package net.weg.general_api.service.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.KafkaException;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.service.kafka.entity.KafkaMessage;
import net.weg.general_api.service.notification.NotificationService;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class KafkaEventSender {
    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;
    private final NotificationService notificationService;

    public void sendEvent(Object object, String httpMethod, String descriptionLog) {
        try {
            String topic = object.getClass().getSimpleName().toLowerCase();
            System.out.println("logDoBackend" + "topic: " + topic);
                KafkaMessage message = new KafkaMessage();
                message.setHttpMethod(httpMethod);
            try {
                message.setObject(object.toString());
            } catch (Exception e) {
                System.err.println("Erro no try catch: " + e.getMessage());
            }
            message.setDescription(descriptionLog);
            String jsonMessage = objectMapper.writeValueAsString(message);
            try {
                System.out.println("logDoBackend" + "jsonMessage: " + jsonMessage);
            } catch (Exception e) {
                System.err.println("Erro no try catch: " + e.getMessage());
            }
            kafkaProducerService.sendMessage(topic, jsonMessage);
        } catch (JsonProcessingException e) {
            throw new KafkaException("Failed to serialize KafkaMessage object: " + e);
        }
    }

    public void sendNotification(Notification notification) {
        try {
            notification = notificationService.createNotification(notification);
            String jsonMessage = objectMapper.writeValueAsString(notification);
            kafkaProducerService.sendMessage("notification", jsonMessage);
        } catch (JsonProcessingException e) {
            throw new KafkaException("Failed to serialize NotificationMessage: " + e);
        }
    }
}
