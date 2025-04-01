package com.example.logs_api.service;

import com.example.logs_api.model.entity.Topic;
import com.example.logs_api.repository.TopicRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TopicService {

    private TopicRepository topicRepository;

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    };

    public List<Topic> getALlTopicsByType(String type) {
        return topicRepository.getTopicByType(type);
    };

    public void deleteTopicByTopic(String topic) {
        topicRepository.deleteByTopic(topic);
    }

}
