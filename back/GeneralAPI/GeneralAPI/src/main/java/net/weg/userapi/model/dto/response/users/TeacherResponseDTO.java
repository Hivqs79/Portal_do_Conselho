package net.weg.userapi.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherResponseDTO {

    private Long id;
    private String name;
    private String email;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private CustomizationResponseDTO customization;

}
