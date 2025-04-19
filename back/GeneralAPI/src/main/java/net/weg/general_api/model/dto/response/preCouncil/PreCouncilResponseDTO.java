package net.weg.general_api.model.dto.response.preCouncil;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreCouncilResponseDTO {
    private Long id;
    private LocalDateTime startDateTime;
    private LocalDateTime finalDateTime;
    private ClassResponseDTO aClass;
    private List<TeacherResponseDTO> teachers;
    private boolean answered;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private boolean enabled;
}
