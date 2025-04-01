package api.chat.service.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KafkaMessage {
    private String httpMethod;
    private String object;
    private String description;
}
