package net.weg.userapi.model.dto.response.annotation;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationClassResponseDTO {
    private Integer id;
    private String rank;
    private String strengths;
    private String toImprove;
    private TeacherResponseDTO teacher;
    private CouncilResponseDTO council;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
