package net.weg.general_api.model.dto.response.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class ExceptionResponseDTO {
    private int status;
    private String error;
    private String message;
    private String path;
    private Class aClass;
    private LocalDateTime timestamp;
}
