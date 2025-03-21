package net.weg.userapi.model.dto.response.annotation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationClassResponseDTO {
    private Integer id;
    private String rank;
    private String strengths;
    private String toImprove;
    private OffsetDateTime releaseDate;
    private TeacherResponseDTO teacher;
    private CouncilResponseDTO council;
}
