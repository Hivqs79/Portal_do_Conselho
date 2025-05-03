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
