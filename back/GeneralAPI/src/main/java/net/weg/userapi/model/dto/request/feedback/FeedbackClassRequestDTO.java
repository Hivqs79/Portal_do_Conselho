package net.weg.userapi.model.dto.request.feedback;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.enums.RankENUM;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackClassRequestDTO {

    private RankENUM rank;
    @NotNull(message = "{not.null.message}")
    private Long council_id;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;


}
