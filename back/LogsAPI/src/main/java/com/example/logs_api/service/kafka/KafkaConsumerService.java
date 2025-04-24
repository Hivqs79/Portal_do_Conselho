package com.example.logs_api.service.kafka;

import com.example.logs_api.model.dto.KafkaMessageDTO;
import com.example.logs_api.model.entity.Log;
import com.example.logs_api.service.LogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KafkaConsumerService {

    private final LogService logService;
    private final ObjectMapper objectMapper;
    private final ConcurrentKafkaListenerContainerFactory<String, String> factory;

    @KafkaListener(topics = "#{T(java.util.Arrays).asList('${KAFKA_TOPICS}'.split(','))}", groupId = "group_logs_api")
    public void consume(String message) throws JsonProcessingException {
        System.out.println("logDoBackend" + "Consumed message: " + message);
        KafkaMessageDTO kafkaMessageDTO = objectMapper.readValue(message, KafkaMessageDTO.class);

        Log log = Log.builder()
                .description(kafkaMessageDTO.getDescription())
                .httpMethod(kafkaMessageDTO.getHttpMethod())
                .object(objectMapper.writeValueAsString(kafkaMessageDTO.getObject()))
                .build();

        logService.addLog(log);
    }
}

