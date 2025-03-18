package net.weg.userapi.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.ClassResponseDTO;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private Boolean isRepresentant;
    private UUID imageKey;
    private List<ClassResponseDTO> classes;
}
