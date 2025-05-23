/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

