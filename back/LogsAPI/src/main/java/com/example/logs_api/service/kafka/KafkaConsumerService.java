package com.example.logs_api.service.kafka;

import com.example.logs_api.model.dto.KafkaMessageDTO;
import com.example.logs_api.model.entity.Log;
import com.example.logs_api.model.entity.Topic;
import com.example.logs_api.service.LogService;
import com.example.logs_api.service.TopicService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.KafkaMessageListenerContainer;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class KafkaConsumerService {

    private final LogService logService;
    private final ObjectMapper objectMapper;
    private final ConcurrentKafkaListenerContainerFactory<String, String> factory;
    private final TopicService topicService;


    @PostConstruct
    public void setupRoomDynamicListeners() {
        List<Topic> topics = topicService.getALlTopicsByType("message");

        for (Topic topic : topics) {
            registryNewTopic(topic.getTopic());
        }
    }

    public void registryNewTopic(String topic) {
        ContainerProperties containerProperties = new ContainerProperties(topic);

        KafkaMessageListenerContainer<String, String> container = new KafkaMessageListenerContainer<>(factory.getConsumerFactory(), containerProperties);
        container.setupMessageListener((MessageListener<String, String>) message -> {
            try {
                System.out.println("logDoBackend" + message.value());
                consume(message.value());
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        });

        container.start();
    }

    @KafkaListener(topics = "#{T(java.util.Arrays).asList('${KAFKA_TOPICS}'.split(','))}", groupId = "group_logs_api")
    public void consume(String message) throws JsonProcessingException {
        System.out.println("logDoBackend" + "Consumed message: " + message);
        KafkaMessageDTO kafkaMessageDTO = objectMapper.readValue(message, KafkaMessageDTO.class);

        if (kafkaMessageDTO.getDescription().equals("Creating a conversation room")) {
            registryNewRoom(kafkaMessageDTO.getObject());
        }

        Log log = Log.builder()
                .description(kafkaMessageDTO.getDescription())
                .httpMethod(kafkaMessageDTO.getHttpMethod())
                .object(objectMapper.writeValueAsString(kafkaMessageDTO.getObject()))
                .build();

        logService.addLog(log);
    }

    public void registryNewRoom(String message) throws JsonProcessingException {
        System.out.println("logDoBackend" + "New room object: " + message);
        String regex = "RoomConversation\\(id=(\\d+), usersId=\\[.*\\]\\)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(message);
        if (matcher.find()) {
            String roomId = matcher.group(1);
            System.out.println("logDoBackend" + "room-id: " + roomId);
            String topic = "room" + roomId;
            registryNewTopic(topic);
            topicService.createTopic(Topic.builder().topic(topic).build());
        }
    }


}

