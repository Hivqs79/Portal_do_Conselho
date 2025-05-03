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

package net.weg.general_api.service.kafka.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.KafkaException;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
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
