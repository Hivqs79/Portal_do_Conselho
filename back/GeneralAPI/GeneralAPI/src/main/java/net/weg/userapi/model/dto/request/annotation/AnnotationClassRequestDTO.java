package net.weg.userapi.model.dto.request.annotation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationClassRequestDTO {
    @NotBlank
    private String rank;
    @NotBlank
    private String strengths;
    @NotBlank
    private String toImprove;
    @NotNull
    private Integer teacher_id;
    @NotNull
    private Integer council_id;

}
