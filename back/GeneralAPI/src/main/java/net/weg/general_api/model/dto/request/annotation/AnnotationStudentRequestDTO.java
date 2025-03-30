package net.weg.general_api.model.dto.request.annotation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.RankENUM;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationStudentRequestDTO {
    private RankENUM rank;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;
    @NotNull(message = "{not.null.message}")
    private Long teacher_id;
    @NotNull(message = "{not.null.message}")
    private Long council_id;
    @NotNull(message = "{not.null.message}")
    private Long student_id;
}
