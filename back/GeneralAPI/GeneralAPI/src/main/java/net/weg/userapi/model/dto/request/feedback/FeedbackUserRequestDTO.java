package net.weg.userapi.model.dto.request.feedback;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.users.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackUserRequestDTO {

    @NotBlank(message = "{not.blank.message}")
    private String rank;
    @NotNull(message = "{not.null.message}")
    private Long council_id;
    @NotBlank(message = "{not.blank.message}")
    private String strengths;
    @NotBlank(message = "{not.blank.message}")
    private String toImprove;
    @NotNull(message = "{not.null.message}")
    private Long user_id;

}
