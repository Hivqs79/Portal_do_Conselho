package net.weg.userapi.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Long id;
    private String name;
    private String email;
    private Boolean isRepresentant;
    private Double frequency;
    private UUID imageKey;
    private List<ClassResponseDTO> classes;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private CustomizationResponseDTO customization;
}
