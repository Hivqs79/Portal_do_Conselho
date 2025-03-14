package net.weg.userapi.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Boolean isRepresentant;
    private UUID imageKey;
    private List<ClassResponseDTO> classes;
}
