package net.weg.general_api.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.KafkaException;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.service.notification.NotificationService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class KafkaEventSender {
    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;
    private final NotificationService notificationService;

    public void sendEvent(Object object, String httpMethod, String descriptionLog) {
        try {
            String topic = object.getClass().getSimpleName().toLowerCase();
            System.out.println("topic: " + topic);

            KafkaMessage message = new KafkaMessage();
            message.setHttpMethod(httpMethod);
            System.out.println(":-:" + message);
            if (object.getClass().getSimpleName().toLowerCase().equals("annotationstudent")) {
                System.out.println(((AnnotationStudent) object).getStudent());
            }
            System.out.println(":-:" + object);
            message.setObject(object.toString());
            System.out.println(":-:" + message);
            message.setDescription(descriptionLog);
            String jsonMessage = objectMapper.writeValueAsString(message);

            System.out.println("jsonMessage: " + jsonMessage);
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
