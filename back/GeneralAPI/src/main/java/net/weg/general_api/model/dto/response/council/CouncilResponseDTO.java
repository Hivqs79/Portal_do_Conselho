package net.weg.general_api.model.dto.response.council;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouncilResponseDTO {

    private Long id;
    private LocalDateTime startDateTime;
    private boolean isHappening;
    private ClassResponseDTO aClass;
    private List<TeacherResponseDTO> teachers;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;


}
