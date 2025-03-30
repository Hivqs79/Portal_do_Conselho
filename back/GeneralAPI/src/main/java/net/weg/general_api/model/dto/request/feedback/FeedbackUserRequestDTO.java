package net.weg.general_api.model.dto.request.feedback;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackUserRequestDTO {

    @NotNull(message = "{not.null.message}")
    private Long council_id;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;
    @NotNull(message = "{not.null.message}")
    private Long user_id;

}
