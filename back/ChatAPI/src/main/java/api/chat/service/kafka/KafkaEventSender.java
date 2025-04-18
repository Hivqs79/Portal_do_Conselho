package api.chat.service.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class KafkaEventSender {
    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;

    public void sendEvent(Object object, String httpMethod, String descriptionLog, String topic) {
        try {
            System.out.println("logDoBackend" + "topic: " + topic);

            KafkaMessage message = new KafkaMessage(httpMethod, object.toString(), descriptionLog);
            String jsonMessage = objectMapper.writeValueAsString(message);

            System.out.println("logDoBackend" + "jsonMessage: " + jsonMessage);
            kafkaProducerService.sendMessage(topic, jsonMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize KafkaMessage object: " + e);
        }
    }

    public void sendEvent(Object object, String httpMethod, String descriptionLog) {
        this.sendEvent(object, httpMethod, descriptionLog, object.getClass().getSimpleName().toLowerCase());
    }

}
