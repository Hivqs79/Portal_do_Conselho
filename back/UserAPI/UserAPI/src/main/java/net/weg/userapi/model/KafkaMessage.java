package net.weg.userapi.model;

import lombok.Data;

@Data
public class KafkaMessage {
    private String httpMethod;
    private Object object;
}
