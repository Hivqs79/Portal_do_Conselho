package net.weg.general_api.model.dto.response.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
public class ValidationResponseDTO {
    private int status;
    private String error;
    private List<String> message;
    private String path;
    private Class aClass;
    private LocalDateTime timestamp;
}
