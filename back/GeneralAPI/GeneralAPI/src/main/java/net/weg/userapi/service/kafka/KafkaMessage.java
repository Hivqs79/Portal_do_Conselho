package net.weg.userapi.service.kafka;

import lombok.Data;

@Data
public class KafkaMessage {
    private String httpMethod;
    private Object object;
}
