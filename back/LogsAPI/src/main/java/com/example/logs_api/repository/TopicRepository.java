package com.example.logs_api.repository;

import com.example.logs_api.model.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> getTopicByType(String type);

    void deleteByTopic(String topic);
}
