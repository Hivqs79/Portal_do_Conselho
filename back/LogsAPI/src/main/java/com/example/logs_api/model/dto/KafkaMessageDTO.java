package com.example.logs_api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KafkaMessageDTO {
    private Object object;
    private String httpMethod;
    private String description;
}
