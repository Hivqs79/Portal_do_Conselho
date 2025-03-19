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

    @NotBlank
    private String rank;
    @NotNull
    private Integer council_id;
    @NotBlank
    private String strengths;
    @NotBlank
    private String toImprove;
    @NotNull
    private Integer user_id;
    @NotNull
    private Double frequency;
}
