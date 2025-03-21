package net.weg.userapi.model.dto.request.annotation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationStudentRequestDTO {
    @NotBlank(message = "{not.blank.message}")
    private String rank;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;
    @NotNull(message = "{not.null.message}")
    private Integer teacher_id;
    @NotNull(message = "{not.null.message}")
    private Integer council_id;
    @NotNull(message = "{not.null.message}")
    private Integer student_id;
}
