package net.weg.userapi.model.dto.request.preCouncil;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncilSectionRequestDTO {

    @NotNull(message = "{not.null.message}")
    private Long preCouncil_id;
    @NotBlank(message = "{not.blank.message}")
    private String topic;
    @NotBlank(message = "{not.blank.message}")
    private String description;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;
}
