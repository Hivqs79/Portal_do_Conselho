package com.example.logs_api.service.kafka;

import com.example.logs_api.model.dto.KafkaMessageDTO;
import com.example.logs_api.model.entity.Log;
import com.example.logs_api.service.LogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KafkaConsumerService {

    private final LogService logService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "#{T(java.util.Arrays).asList('${KAFKA_TOPICS}'.split(','))}", groupId = "group_id")
    public void consume(String message) throws JsonProcessingException {
        System.out.println("Consumed message: " + message);
        KafkaMessageDTO kafkaMessageDTO = objectMapper.readValue(message, KafkaMessageDTO.class);

        Log log = new Log();
        log.setDescription(kafkaMessageDTO.getDescription());
        log.setHttpMethod(kafkaMessageDTO.getHttpMethod());

        log.setObject(objectMapper.writeValueAsString(kafkaMessageDTO.getObject()));
        logService.addLog(log);
    }
}

