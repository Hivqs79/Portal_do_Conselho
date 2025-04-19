package net.weg.general_api.service.kafka.entity;

import lombok.Data;

@Data
public class KafkaMessage {
    private String httpMethod;
    private String object;
    private String description;
}
