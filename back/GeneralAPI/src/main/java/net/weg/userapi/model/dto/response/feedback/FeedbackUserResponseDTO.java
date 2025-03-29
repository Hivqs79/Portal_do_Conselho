package net.weg.userapi.model.dto.response.feedback;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.dto.response.users.UserResponseDTO;
import net.weg.userapi.model.entity.users.User;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackUserResponseDTO {
    private Long id;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private UserResponseDTO user;
    private boolean isViewed;
    private boolean isSatisfied;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
