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

    @NotNull
    private Integer preCouncil_id;
    @NotBlank
    private String topic;
    @NotBlank
    private String description;
    @NotBlank
    private String strengths;
    @NotBlank
    private String toImprove;
}
