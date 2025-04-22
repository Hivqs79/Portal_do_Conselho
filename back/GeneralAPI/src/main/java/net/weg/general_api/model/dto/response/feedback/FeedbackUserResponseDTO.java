package net.weg.general_api.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackUserResponseDTO {
    private Long id;
    private PreCouncilResponseDTO preCouncil;
    private String strengths;
    private String toImprove;
    private UserResponseDTO user;
    private boolean isViewed;
    private boolean isSatisfied;
    private boolean isReturned;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private boolean enabled;
}
