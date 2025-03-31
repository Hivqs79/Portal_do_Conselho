package net.weg.general_api.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.KafkaException;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class KafkaEventSender {
    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;

    public void sendEvent(Object object, String httpMethod, String descriptionLog) {
        try {
            String topic = object.getClass().getSimpleName().toLowerCase();
            System.out.println("topic: " + topic);

            KafkaMessage message = new KafkaMessage();
            message.setHttpMethod(httpMethod);
            message.setObject(object.toString());
            message.setDescription(descriptionLog);
            String jsonMessage = objectMapper.writeValueAsString(message);

            System.out.println("jsonMessage: " + jsonMessage);
            kafkaProducerService.sendMessage(topic, jsonMessage);
        } catch (JsonProcessingException e) {
            throw new KafkaException("Failed to serialize KafkaMessage object: " + e);
        }
    }
}
